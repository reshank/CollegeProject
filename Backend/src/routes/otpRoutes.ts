import express from "express";
import {
  sendRegister,
  verify,
  sendOtp,
  verifyRegister,
} from "../controllers/otpController";

const router = express.Router();

router.route("/register").post(sendRegister);
router.route("/verifyRegister").post(verifyRegister);

//open api
router.route("/sendOtp").post(sendOtp);
router.route("/verifyOtp").post(verify);

export default router;
