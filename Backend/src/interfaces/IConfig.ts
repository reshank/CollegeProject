import { ObjectID } from "mongodb";
import { Document } from "mongoose";
import { IShop } from "./IShop";

export interface IConfig extends Document {
  key: string;
  value: any;
  shop: string | ObjectID | IShop;
}
