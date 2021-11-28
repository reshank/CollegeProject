import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/database";
import { middlewaresConfig } from "./src/middlewares";
import  rootRoutes from "./src/routes/index";
import path from "path";
import { CronJob } from "cron";
import deleteExpiredOTP from "./src/cron/deleteExpiredOTP";

/* Initialization */
const app = express();
/* Config */
connectDB();
dotenv.config({
  path: path.resolve(".env"),
});

//cron job implement

// runs every 12 hours.
const deleteExpiredOTPJob = new CronJob("0 */12 * * *", () => {
  deleteExpiredOTP();
});
deleteExpiredOTPJob.start();

/* Middleware Config */
middlewaresConfig(app);
rootRoutes(app);

const PORT = process.env.PORT || 5002;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
