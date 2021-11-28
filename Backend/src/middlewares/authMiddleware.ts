import jwt_decode from "jwt-decode";
import { IUser } from "../interfaces/IUser";
import User from "../models/userModel";

export const auth = async (req, res, next) => {
  if (!req.cookies.qselly_user_token) {
    res.cookie("qselly_user_token", "", {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "development" ? "strict" : "none",
      secure: process.env.NODE_ENV === "production",
    });

    return res
      .status(401)
      .json({ errors: ["Please login to continue. User is not logged in"] });
  }

  let decoded: any = jwt_decode(req.cookies.qselly_user_token);
  let user: IUser = await User.findById(decoded.id);

  if (!user) {
    res.cookie("qselly_user_token", "", {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "development" ? "strict" : "none",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(401).json({
      errors: ["Session has been expired! Please login again."],
    });
  }

  if (user.blocked) {
    res.cookie("qselly_user_token", "", {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "development" ? "strict" : "none",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(403).json({
      errors: [
        "User has been blocked. Please reached out for more information",
      ],
    });
  }

  req.user = user;

  next();
};
