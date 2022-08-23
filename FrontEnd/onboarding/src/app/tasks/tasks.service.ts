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

  constructor(userService: UserService, http: HttpClient) {
    const taskUrl = 'Tasks';
    super(userService, http, taskUrl);
  }

  public newTask(taskForm: ITaskForm): Observable<any> {
    return this.post(taskForm);
  }

  public getTasks(): Observable<ITask[]> {
    return this.getAll();
  }

  public getTaskByID(idProject : number): Observable<any> {
    return this.getById(idProject);
  }

  public getMyTasks(): Observable<ITask[]> {
    return this.getSpecific('GetMyTasks');
  }

  public getTasksByUser(username: string): Observable<ITask[]> {
    return this.getSpecific('GetProgrammerTasks/' + username);
  }

  public getTasksByProject(idProject : number): Observable<ITask[]> {
    return this.getSpecific('GetProjectTasks/' + idProject);
  }

  public updateTask(taskId: number, taskForm: ITask): Observable<any> {
    return this.update(taskId, taskForm);
  }

  public deleteTask(taskID: number): Observable<any> {
    return this.delete(taskID);
  }

  //--------------------------------------------------------------------------------------------------------------------

  public getCalendar(): Observable<ITask[]> {
    return this.getSpecific('Calendar');
  }

}
