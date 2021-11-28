import express from "express";
import {
  create,
  list,
  detail,
  update,
} from "../controllers/orderController";
import { getShop, isAdmin } from "../middlewares/shopMiddleware";
import { auth } from "../middlewares/authMiddleware";

const router = express.Router();

//auth
router.route("/list").get(auth, isAdmin, list);
router.route("/detail/:orderId").get(auth, isAdmin, detail);
router.route("/update/:orderId").patch(auth, isAdmin, update);

//public route
router.route("/create").post(getShop, create);

export default router;
