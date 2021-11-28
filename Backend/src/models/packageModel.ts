import { model, Schema } from "mongoose";
import { IPackage } from "../interfaces/IPackage";

const packageSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    maxProducts: {
      type: Number,
    },
    maxCategory: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Package = model<IPackage>("Package", packageSchema);

export default Package;
