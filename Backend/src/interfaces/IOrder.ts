import { Document } from "mongoose";
import { ObjectID } from "mongodb";
import { IProduct } from "./IProduct";
import { IShop } from "./IShop";

export interface IOrderDetails {
  product: string | ObjectID | IProduct;
  price: IProduct["price"];
  quantity: number;
}

export interface IExtraCharge {
  type: "percent" | "fixed";
  name: string;
  amount?: number;
  percent?: any;
}

export interface IOrder extends Document {
  name: string;
  mobile: string;
  city: string;
  state: string;
  fullAddress: string;
  paymentMethod: string;
  orderDetails: IOrderDetails[];
  shop: string | ObjectID | IShop;
  status:
    | "Just placed"
    | "Accepted"
    | "Rejected"
    | "Shipped"
    | "Delivered"
    | "Cancelled";
  orderId: string;
  totalPrice: number;
  createdAt: Date;
  deliveryCharge: number;
  itemTotal: number;
  extraCharges?: IExtraCharge[];
  grandTotal: number;
  message?: string;
}
