import { IUsers } from "../dashboard/IUsers";
import { IProjectsID } from "../project/projects-list/IProjectsID";

export interface  ITask{
  id: number;
  name: string;
  deadline: Date;
  state: number;
  project: IProjectsID;
  programmer: IUsers;
}

