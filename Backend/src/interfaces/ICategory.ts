import { Document } from "mongoose";
import { ObjectID } from "mongodb";
import { IShop } from "./IShop";

export interface IImage {
  url: string;
  public_id: string;
  asset_id: string;
}

export interface ICategory extends Document {
  name: string;
  slug: string;
  image: IImage;
  shop: string | ObjectID | IShop;
  bestSelling: boolean;
}
