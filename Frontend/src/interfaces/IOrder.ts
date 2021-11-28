import { IBase } from "./IBase";
import { IImage, IProduct } from "./IProduct";
import { IShop } from "./IShop";

export interface IOrderDetails {
  _id: string;
  product: string | IProduct;
  price: IProduct["price"];
  quantity: number;
  image: IImage;
  size?: string;
  sizeId?: string;
}

interface IExtraCharge {
  name: string;
  amount: number;
}

export interface IOrder extends IBase {
  name: string;
  mobile: string;
  city: string;
  state: string;
  fullAddress: string;
  paymentMethod: string;
  orderDetails: IOrderDetails[];
  //this data is available on backend or after order generate
  shop?: string | IShop;
  status?: string;
  orderId?: string;
  itemTotal?: number;
  deliveryCharge?: number;
  extraCharges?: IExtraCharge[];
  grandTotal?: number;
  message?: string;
}
