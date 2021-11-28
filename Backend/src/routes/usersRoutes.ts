import express from "express";
import {
  register,
  login,
  logout,
  isLoggedIn,
} from "../controllers/usersController";
import { auth } from "../middlewares/authMiddleware";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);

router.route("/logout").get(auth, logout);
router.route("/isLoggedIn").get(auth, isLoggedIn);

export default router;
