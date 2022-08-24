import { HttpClient, HttpHeaders } from "@angular/common/http";
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

  header: HttpHeaders;

  constructor(userService: UserService, http: HttpClient) {
    const taskUrl = 'Tasks';
    super(http, taskUrl);

    this.header = new HttpHeaders({ 'Authorization': 'Bearer ' + userService.getCookie(this.Cookies.Token) });
  }

  public newTask(taskForm: ITaskForm): Observable<any> {
    return this.post(taskForm, "Add", this.header);
  }

  public getTasks(): Observable<ITask[]> {
    return this.getAll(this.header);
  }

  public getTaskByID(idProject : number): Observable<any> {
    return this.getById(idProject, this.header);
  }

  public getMyTasks(): Observable<ITask[]> {
    return this.getSpecific('GetMyTasks', this.header);
  }

  public getTasksByUser(username: string): Observable<ITask[]> {
    return this.getSpecific('GetProgrammerTasks/' + username, this.header);
  }

  public getTasksByProject(idProject : number): Observable<ITask[]> {
    return this.getSpecific('GetProjectTasks/' + idProject, this.header);
  }

  public updateTask(taskId: number, taskForm: ITask): Observable<any> {
    return this.update(taskId, taskForm, this.header);
  }

  public deleteTask(taskID: number): Observable<any> {
    return this.delete(taskID, this.header);
  }

  //--------------------------------------------------------------------------------------------------------------------

  public getCalendar(): Observable<ITask[]> {
    return this.getSpecific('Calendar', this.header);
  }

}
