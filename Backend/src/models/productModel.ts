import { Schema, model } from "mongoose";
import { IProduct } from "../interfaces/IProduct";

const productSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      text: true,
    },
    slug: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: true,
      text: true,
    },
    longDescription: {
      type: String,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    shop: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
    },
    status: {
      type: String,
      required: true,
      default: "In stock",
      enum: ["In stock", "Out of stock"],
    },
    bestSelling: {
      type: Boolean,
      default: false,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Product = model<IProduct>("Product", productSchema);

export default Product;
