import { HttpHeaders } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../user/guards/user.service";
import { ITask } from "./ITask";


@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasksUrl = 'http://localhost:5000/api/Tasks/';

  constructor(private userService: UserService, private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  /*
  public getProjects(): void {

  }

  */
  public getTasksGet(): Observable<ITask[]> {
    return this.http.get<ITask[]>(
      this.tasksUrl + 'All',
      {
        headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.userService.getToken() })
      }
    );
  }

  public getTaskByID(idProject : number): Observable<any> {
    return this.http.get(
      this.tasksUrl + idProject,
      {
        headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.userService.getToken() })
      }
    );
  }

  public getTasksByUser(token: string | null | undefined): Observable<ITask[]> {
    return this.http.get<ITask[]>(
      this.tasksUrl + 'GetProgrammerTasks',
      {
        headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token })
      }
    );
  }

  public getTasksByProject(token: string | null | undefined, idProject : number): Observable<any> {
    return this.http.get(
      this.tasksUrl + 'GetProjectTasks/' + idProject,
      {
        headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token })
      }
    );
  }

  private newTaskPost(token: string | null | undefined, taskForm: ITask): Observable<any> {
    return this.http.post(
      this.tasksUrl + 'Add',
      taskForm,
      {
        headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token })
      }
    );
  }

  public newTask(taskForm: ITask): void {
    this.newTaskPost(this.userService.getToken(), taskForm).subscribe(
      {
        error: (error) => this.onHttpError("Error: " + error),
        complete: () => this.router.navigate(['projects'])
      }
    );
  }

  /*
  public deleteProject(projectId: number): void {
    this.deleteProjectDelete(this.userService.getToken(), projectId).subscribe(
      {
        error: (error) => this.onHttpError("Error: " + error),
        complete: () => this.
      }
    );
  }

  private deleteProjectDelete(token: string | null | undefined, projectId: number): Observable<any> {
    return this.http.delete(this.projectsUrl + projectId, {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token })
    });
  }
*/
  onHttpError(errorResponse: any) {
    console.log('error: ', errorResponse);
  }

}
