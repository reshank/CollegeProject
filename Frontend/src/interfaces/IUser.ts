import { IBase } from "./IBase";

export interface IUser extends IBase {
  firstName: string;
  lastName: string;
  mobile?: string;
  email: string;
  password: string;
  role: string;
  confirmed: boolean;
  blocked: boolean;
  secretToken: string;
}
