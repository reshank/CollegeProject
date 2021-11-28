import otp from "./otpRoutes";
import users from "./usersRoutes";
import shop from "./shopRoutes";
import product from "./productRoutes";
import category from "./categoryRoutes";
import image from "./imageRoutes";
import order from "./orderRoutes";

const rootRoutes = (app) => {
  app.use("/users", users);
  app.use("/otp", otp);
  app.use("/shop", shop);
  app.use("/product", product);
  app.use("/category", category);
  app.use("/image", image);
  app.use("/order", order);
};

export default rootRoutes;
