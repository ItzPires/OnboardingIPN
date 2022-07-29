import { IUser } from "../common/IUser";

export interface  IUserRegister extends IUser {
  email: string;
  isManager: string;
}
