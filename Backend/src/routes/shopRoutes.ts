import express from "express";
import {
  register,
  adminData,
  getDashboardData,
  renewPlan,
  detail,
  update,
} from "../controllers/shopController";
import { auth } from "../middlewares/authMiddleware";
import {
  shopRegister,
  available,
  isAdmin,
  getShop,
} from "../middlewares/shopMiddleware";

const router = express.Router();

//open routes
router.route("/available/:shop_name").get(available);

//admin apis
router.route("/register").post(auth, shopRegister, register);
router.route("/isAdmin").get(auth, isAdmin, adminData);
router.route("/renewPlan").patch(auth, isAdmin, renewPlan);
router.route("/detail").get(auth, isAdmin, detail);
router.route("/update").patch(auth, isAdmin, update);

//dashboard route
router.route("/dashboardData").get(auth, isAdmin, getDashboardData);

export default router;
