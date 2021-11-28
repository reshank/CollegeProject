import { IBase } from "./IBase";
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

export interface IProduct extends IBase {
  name: string;
  slug: string;
  images?: IImage[];
  price: number;
  discountPrice?: number;
  description: string;
  longDescription?: string;
  category: ICategory;
  shop: IShop;
  status: "In stock" | "Out of stock";
  bestSelling: boolean;
  sizes?: ISize[];
}
