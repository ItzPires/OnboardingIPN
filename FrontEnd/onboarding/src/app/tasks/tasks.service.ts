import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "../shared/api.service";
import { UserService } from "../user/user.service";
import { ITask } from "./ITask";
import { ITaskForm } from "./tasks-new/ITaskForm";

@Injectable({
  providedIn: 'root'
})
export class TasksService extends ApiService<ITask> {

  constructor(private userService: UserService, http: HttpClient) {
    const taskUrl = 'Tasks';
    super(http, taskUrl);
  }

  public newTask(taskForm: ITaskForm): Observable<any> {
    return this.post(taskForm, "Add", this.userService.getHeader());
  }

  public getTasks(): Observable<ITask[]> {
    return this.getAll(this.userService.getHeader());
  }

  public getTaskByID(idProject : number): Observable<any> {
    return this.getById(idProject, this.userService.getHeader());
  }

  public getMyTasks(): Observable<ITask[]> {
    return this.getSpecific('GetMyTasks', this.userService.getHeader());
  }

  public getTasksByUser(username: string): Observable<ITask[]> {
    return this.getSpecific('GetProgrammerTasks/' + username, this.userService.getHeader());
  }

  public getTasksByProject(idProject : number): Observable<ITask[]> {
    return this.getSpecific('GetProjectTasks/' + idProject, this.userService.getHeader());
  }

  public updateTask(taskId: number, taskForm: ITask): Observable<any> {
    return this.update(taskId, taskForm, this.userService.getHeader());
  }

  public deleteTask(taskID: number): Observable<any> {
    return this.delete(taskID, this.userService.getHeader());
  }

  //--------------------------------------------------------------------------------------------------------------------

  public getCalendar(): Observable<ITask[]> {
    return this.getSpecific('Calendar', this.userService.getHeader());
  }

}
