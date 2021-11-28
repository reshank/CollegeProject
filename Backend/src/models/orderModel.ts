import { model, Schema } from "mongoose";
import { IOrder } from "../interfaces/IOrder";
import { sendMessage } from "../utils/otp";

const orderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    fullAddress: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      default: "cod",
      enum: ["cod"],
    },
    orderDetails: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        image: {
          type: Object,
        },
        size: {
          type: String,
        },
      },
    ],
    shop: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
    },
    orderId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "Just placed",
      enum: [
        "Just placed",
        "Accepted",
        "Rejected",
        "Shipped",
        "Deliveried",
        "Cancelled",
      ],
    },
    itemTotal: {
      type: Number,
      required: true,
    },
    deliveryCharge: {
      type: Number,
      required: true,
    },
    extraCharges: {
      type: Array,
    },
    grandTotal: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.post<IOrder>("save", (data) => {
  sendMessage({
    message: `Dear Customer, Thanks for ordering with us, Your order order has been placed. The tracking number for your order is ${data?.orderId}`,
    mobile: data?.mobile,
  });
});

orderSchema.post<IOrder>(/^(updateOne|findOneAndUpdate)/, (data) => {
  sendMessage({
    message: `Dear Customer, Thanks for ordering with us, Your order order has been placed. The tracking number for your order is ${data?.orderId}`,
    mobile: data?.mobile,
  });
});

const Order = model<IOrder>("Order", orderSchema);

export default Order;
