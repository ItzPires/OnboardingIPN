import { IUsers } from "../dashboard/IUsers";

export interface  IComment{
  content: string;
  date: Date;
  writer: IUsers;
}

