import express from "express";
import {
  create,
  detail,
  list,
  update,
  remove,
  bestSelling,
} from "../controllers/categoryController";
import { auth } from "../middlewares/authMiddleware";
import { getShop, isAdmin } from "../middlewares/shopMiddleware";

const router = express.Router();

//auth
router.route("/create").post(auth, isAdmin, create);
router.route("/update/:categoryId").put(auth, isAdmin, update);
router.route("/delete/:categoryId").delete(auth, isAdmin, remove);

//admin routes
router.route("/list").get(auth, isAdmin, list);
router.route("/detail/:categoryId").get(auth, isAdmin, detail);

//public route
router.route("/list").post(getShop, list);
router.route("/bestSeller").post(getShop, bestSelling);

export default router;
