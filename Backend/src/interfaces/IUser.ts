import { Document } from "mongoose";

export interface IUser extends Document {
  name?: string;
  mobile?: string;
  email?: string;
  role: string;
  confirmed: boolean;
  blocked: boolean;
}
