import * as Yup from "yup";
import dotenv from "dotenv";
//models imports
import User from "../models/userModel";
import Otp from "../models/otpModel";
import { generateToken } from "../utils/token";
import errorHandler from "../utils/errorHandler";
import { sendError, sendSuccess } from "../utils/responseHandler";

dotenv.config();

// @desc    Send Otp to Mobile
// @route   POST /otp/register
// @access  Public
export const sendRegister = async (req, res) => {
  const { mobile } = req.body;

  const schema = Yup.object().shape({
    mobile: Yup.string()
      .min(11, "Mobile number must be valid")
      .max(13, "Mobile number must be valid")
      .required("Mobile is a required field"),
  });

  try {
    await schema.validate(
      {
        mobile,
      },
      { abortEarly: false }
    );

    //expires after 3 hours from creating.
    let expiresTime = new Date();
    expiresTime.setHours(expiresTime.getHours() + 3);
    //let generatedOtp = Math.floor(100000 + Math.random() * 900000);

    let generatedOtp = 111111;

    // await sendMessage({
    //   message: `Your otp is ${generatedOtp}`,
    //   mobile,
    // });

    //create otp if already exists else update it.
    await Otp.updateOne(
      { mobile },
      {
        mobile,
        otp: generatedOtp,
        expiresAt: expiresTime,
      },
      { upsert: true }
    );

    res.status(200).json({
      msg: "Otp send successfully",
      otpSent: true,
      mobile,
    });
  } catch (err) {
    //yup error catch here
    errorHandler(res, err);
  }
};

// @desc    Send Otp to Mobile
// @route   POST /otp/send-otp
// @access  Public
export const sendOtp = async (req, res) => {
  const { mobile } = req.body;

  const schema = Yup.object().shape({
    mobile: Yup.string()
      .min(11, "Mobile number must be valid")
      .max(13, "Mobile number must be valid")
      .required("Mobile is a required field"),
  });

  try {
    await schema.validate(
      {
        mobile,
      },
      { abortEarly: false }
    );

    //expires after 3 hours from creating.
    let expiresTime = new Date();
    expiresTime.setHours(expiresTime.getHours() + 3);
    // let generatedOtp = Math.floor(100000 + Math.random() * 900000);
    let generatedOtp = 111111;

    //TODO: send OTP to mobile device
    // await client.messages.create({
    //   body: `Your Qselly verification code is ${generatedOtp}`,
    //   from: "+17605072358",
    //   to: `+977${mobile}`,
    // });

    //create otp if already exists else update it.
    await Otp.updateOne(
      { mobile },
      {
        mobile,
        otp: generatedOtp,
        expiresAt: expiresTime,
      },
      { upsert: true }
    );

    res.status(200).json({
      msg: "Otp send successfully",
      isOtpSent: true,
    });
  } catch (err) {
    console.log(err);
    //yup error catch here
    errorHandler(res, err);
  }
};

// @desc    Verify Otp
// @route   POST /otp/verify-otp
// @access  Public
export const verify = async (req, res) => {
  const { mobile, otp } = req.body;

  const schema = Yup.object().shape({
    mobile: Yup.string().required("Mobile is a required field"),
    otp: Yup.string().required("Otp is a required field"),
  });

  try {
    await schema.validate(
      {
        mobile,
        otp,
      },
      { abortEarly: false }
    );

    let data = await Otp.findOne({ mobile, otp });

    if (data) {
      return sendSuccess({
        res,
        statusCode: 200,
        data: {
          verified: true,
        },
        message: "OTP verified successfully",
      });
    }

    return sendError({
      res,
      statusCode: 400,
      message: "Invalid OTP",
      data: null,
    });
  } catch (err) {
    errorHandler(res, err);
  }
};

// @desc    Verify Otp
// @route   POST /otp/verifyRegister
// @access  Public
export const verifyRegister = async (req, res) => {
  const { mobile, otp } = req.body;

  const schema = Yup.object().shape({
    mobile: Yup.string().required("Mobile is a required field"),
    otp: Yup.string().required("Otp is a required field"),
  });

  try {
    await schema.validate(
      {
        mobile,
        otp,
      },
      { abortEarly: false }
    );

    let data = await Otp.findOne({ mobile, otp });

    if (!data) {
      return sendError({
        res,
        statusCode: 400,
        message: "Invalid OTP",
        data: null,
      });
    }

    let userMobileExits = await User.findOne({
      mobile,
    });

    if (userMobileExits) {
      let generatedToken = await generateToken(userMobileExits?._id);
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
      mobile,
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
  } catch (err) {
    errorHandler(res, err);
  }
};
