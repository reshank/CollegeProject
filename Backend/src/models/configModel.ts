import mongoose, { Schema } from "mongoose";
import { IConfig } from "../interfaces/IConfig";

const configSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
    },
    value: {
      type: Object,
      required: true,
    },
    shop: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Config = mongoose.model<IConfig>("Config", configSchema);

export default Config;
