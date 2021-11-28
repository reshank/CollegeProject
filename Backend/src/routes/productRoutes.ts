import express from "express";
import {
  create,
  detail,
  list,
  remove,
  update,
  bestSelling,
  search,
  recent,
} from "../controllers/productController";
import { auth } from "../middlewares/authMiddleware";
import { getShop, isAdmin } from "../middlewares/shopMiddleware";

const router = express.Router();

//admin routes
router.route("/list").get(auth, isAdmin, list);
router.route("/detail/:productId").get(auth, isAdmin, detail);
router.route("/create").post(auth, isAdmin, create);
router.route("/delete/:productId").delete(auth, isAdmin, remove);
router.route("/update/:productId").patch(auth, isAdmin, update);

//public route
router.route("/detail/:productId").post(getShop, detail);
router.route("/bestSeller").post(getShop, bestSelling);
router.route("/recent").post(getShop, recent);
router.route("/search").post(getShop, search);

export default router;
