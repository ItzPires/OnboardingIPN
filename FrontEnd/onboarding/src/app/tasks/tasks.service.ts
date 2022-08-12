import { HttpHeaders } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserService } from "../user/user.service";
import { ITask } from "./ITask";
import { ITaskForm } from "./tasks-new/ITaskForm";


@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasksUrl = 'http://localhost:5000/api/Tasks/';
  header: HttpHeaders;

  constructor(private userService: UserService, private http: HttpClient)
  {
    this.header = new HttpHeaders({ 'Authorization': 'Bearer ' + this.userService.getToken() });
  }

  public getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(
      this.tasksUrl + 'All',
      {
        headers: this.header,
      }
    );
  }

  public getTaskByID(idProject : number): Observable<any> {
    return this.http.get(
      this.tasksUrl + idProject,
      {
        headers: this.header,
      }
    );
  }

  public getMyTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(
      this.tasksUrl + 'GetMyTasks',
      {
        headers: this.header,
      }
    );
  }

  public getTasksByUser(username: string): Observable<ITask[]> {
    return this.http.get<ITask[]>(
      this.tasksUrl + 'GetProgrammerTasks/' + username,
      {
        headers: this.header,
      }
    );
  }

  public getTasksByProject(idProject : number): Observable<any> {
    return this.http.get(
      this.tasksUrl + 'GetProjectTasks/' + idProject,
      {
        headers: this.header,
      }
    );
  }

  public newTask(taskForm: ITaskForm): Observable<any> {
    return this.http.post(
      this.tasksUrl + 'Add',
      taskForm,
      {
        headers: this.header,
      }
    );
  }

  public updateTask(taskId: number, taskForm: ITask): Observable<any> {
    return this.http.put(
      this.tasksUrl + 'Update/' + taskId,
      taskForm,
      {
        headers: this.header,
      }
    );
  }

  public deleteTask(taskID: number): Observable<any> {
    return this.http.delete(this.tasksUrl + taskID, {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.userService.getToken() })
    });
  }
}
