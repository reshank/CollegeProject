import { Document } from "mongoose";

export interface IPackage extends Document {
  name: string;
  price: number;
  maxProducts?: number;
  maxCategory?: number;
  description?: string;
}
