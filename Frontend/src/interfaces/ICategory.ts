import { IBase } from "./IBase";
import { IShop } from "./IShop";

export interface IImage {
  url: string;
  public_id: string;
  asset_id: string;
}

export interface ICategory extends IBase {
  name: string;
  slug: string;
  image: IImage;
  shop: string | IShop;
  bestSelling: boolean;
}
