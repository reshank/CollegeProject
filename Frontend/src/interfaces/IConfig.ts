import { IBase } from "./IBase";
import { IShop } from "./IShop";

export interface IConfig extends IBase {
  key: string;
  value: string;
  shop: string | IShop;
}
