import { ObjectID } from "mongodb";
import { Document } from "mongoose";
import { IUser } from "./IUser";

export interface IImage {
  url: string;
  public_id: string;
  asset_id: string;
}

interface ISocialData {
  facebook?: string;
  instagram?: string;
  mobile?: string;
  whatsapp?: string;
}

interface IOtherData {
  supportEmail?: string;
  delivery?: string;
}

export interface IShop extends Document {
  name: string;
  slug: string;
  description?: string;
  owner: string | ObjectID | IUser;
  plan: string;
  expiresAt: Date;
  shopView: number;
  image?: IImage;
  location?: string;
  socialData?: ISocialData;
  otherData?: IOtherData;
  opened: boolean;
}
