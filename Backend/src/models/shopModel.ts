import mongoose from "mongoose";
import { IShop } from "../interfaces/IShop";

const shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    image: {
      type: Object,
    },
    location: {
      type: String,
    },
    shopView: {
      type: Number,
      required: true,
      default: 0,
    },
    opened: {
      type: Boolean,
      required: true,
      default: true,
    },
    socialData: {
      facebook: {
        type: String,
      },
      instagram: {
        type: String,
      },
      whatsapp: {
        type: String,
      },
      mobile: {
        type: String,
      },
    },
    otherData: {
      supportEmail: {
        type: String,
      },
      delivery: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Shop = mongoose.model<IShop>("Shop", shopSchema);

export default Shop;
