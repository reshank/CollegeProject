import { IBase } from "./IBase";
import { IUser } from "./IUser";

export interface IImage {
  url: string;
  public_id: string;
  asset_id: string;
}

interface ISocialData {
  facebook?: string;
  instagram?: string;
}

interface IOtherData {
  supportEmail?: string;
  delivery?: string;
}

export interface IShop extends IBase {
  name: string;
  slug: string;
  description?: string;
  owner: string | IUser;
  plan: string;
  expiresAt: Date;
  image?: IImage;
  location?: string;
  socialData?: ISocialData;
  otherData?: IOtherData;
  country?: string;
}
