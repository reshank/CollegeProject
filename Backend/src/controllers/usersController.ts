import * as Yup from "yup";
//models imports
import User from "../models/userModel";
import Shop from "../models/shopModel";
import { generateToken } from "../utils/token";
import jwt_decode from "jwt-decode";
import dotenv from "dotenv";
import { IUser } from "../interfaces/IUser";
import { IShop } from "../interfaces/IShop";
import { getDataFromAuthProviders } from "../utils/authProvider";
import errorHandler from "../utils/errorHandler";

dotenv.config();

// @desc    Register a new user
// @route   POST /users/register
// @access  Public
export const register = async (req, res) => {
  const { accessToken, type } = req.body;

  const schema = Yup.object().shape({
    accessToken: Yup.string().required("Access Token is a required field"),
    type: Yup.string().required("Type is a required field"),
  });

  try {
    await schema.validate(
      {
        accessToken,
        type,
      },
      { abortEarly: false }
    );

    let { email, name } = await getDataFromAuthProviders({
      type,
      token: accessToken,
    });

    let userExists: IUser = await User.findOne({
      email,
    });

    //if user exist, login the user
    if (userExists) {
      let generatedToken = await generateToken(userExists?._id);
      //set Cookie
      res.cookie("qselly_user_token", generatedToken, {
        expires: new Date(new Date().getTime() + 7 * 24 * 3600 * 1000), //7 days expire
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "development" ? "strict" : "none",
        secure: process.env.NODE_ENV === "production",
      });

      return res.end();
    }

    const user = await User.create({
      name,
      email,
      role: "owner",
      confirmed: true,
    });

    let generatedToken = await generateToken(user?._id);
    //set Cookie
    res.cookie("qselly_user_token", generatedToken, {
      expires: new Date(new Date().getTime() + 7 * 24 * 3600 * 1000), //7 days expire
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "development" ? "strict" : "none",
      secure: process.env.NODE_ENV === "production",
    });

    res.end();
  } catch (err) {
    errorHandler(res, err);
  }
};

// @desc    Login  user
// @route   POST /users/login
// @access  Public
export const login = async (req, res) => {
  const { accessToken, type } = req.body;

  const schema = Yup.object().shape({
    accessToken: Yup.string().required("Access Token is a required field"),
    type: Yup.string().required("Type is a required field"),
  });

  try {
    await schema.validate(
      {
        accessToken,
        type,
      },
      { abortEarly: false }
    );

    let { email } = await getDataFromAuthProviders({
      type,
      token: accessToken,
    });

    let userExists: IUser = await User.findOne({
      email,
    });

    //if user doesnot exist, register and logged into account :)
    if (!userExists) {
      let { email, name } = await getDataFromAuthProviders({
        type,
        token: accessToken,
      });

      const user = await User.create({
        name,
        email,
        role: "owner",
        confirmed: true,
      });

      let generatedToken = await generateToken(user?._id);
      //set Cookie
      res.cookie("qselly_user_token", generatedToken, {
        expires: new Date(new Date().getTime() + 7 * 24 * 3600 * 1000), //7 days expire
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "development" ? "strict" : "none",
        secure: process.env.NODE_ENV === "production",
      });

      return res.end();
    }

    let user: IUser = await User.findOne({ email });

    if (!user.confirmed) {
      return res.status(401).json({
        errors: ["Your account is not verified. Please verify to continue."],
      });
    }

    if (user.blocked) {
      return res.status(401).json({
        errors: [
          "User has been blocked. Please reached out for more information",
        ],
      });
    }

    let generatedToken = await generateToken(user?._id);
    //set Cookie
    res.cookie("qselly_user_token", generatedToken, {
      expires: new Date(new Date().getTime() + 7 * 24 * 3600 * 1000), //7 days expire
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "development" ? "strict" : "none",
      secure: process.env.NODE_ENV === "production",
    });

    return res.end();
  } catch (err) {
    errorHandler(res, err);
  }
};

// @desc    Logout  user
// @route   GET /users/logout
// @access  Private
export const logout = async (req, res) => {
  try {
    //clear Cookie
    res.cookie("qselly_user_token", "", {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "development" ? "strict" : "none",
      secure: process.env.NODE_ENV === "production",
    });

    res.end();
  } catch (err) {
    errorHandler(res, err);
  }
};

// @desc    Check if user is logged in
// @route   GET /users/isLoggedIn
// @access  Private
export const isLoggedIn = async (req, res) => {
  try {
    let decoded: any = jwt_decode(req.cookies.qselly_user_token);
    let shop: IShop = await Shop.findOne({ owner: decoded.id });
    res.status(200).json({ isLoggedIn: true, slug: shop?.slug || "" });
  } catch (err) {
    errorHandler(res, err);
  }
};
