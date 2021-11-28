import { ObjectID } from "mongodb";
import { Document } from "mongoose";
import { ICategory } from "./ICategory";
import { IShop } from "./IShop";

export interface IImage {
  url: string;
  public_id: string;
  asset_id: string;
}

export interface ISize {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
}

export interface IProduct extends Document {
  name: string;
  slug: string;
  images?: IImage[];
  price: number;
  discountPrice?: number;
  description: string;
  longDescription?: string;
  category: string | ObjectID | ICategory;
  shop: string | ObjectID | IShop;
  status: string;
  bestSelling: boolean;
  sizes?: ISize[];
}
