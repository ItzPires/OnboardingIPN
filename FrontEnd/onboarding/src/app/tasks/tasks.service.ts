import { HttpHeaders } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../user/user.service";
import { ITask } from "./ITask";
import { ITaskV } from "./ITaskV";


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
  public getTasksGet(token: string | null | undefined): Observable<ITaskV[]> {
    return this.http.get<ITaskV[]>(
      this.tasksUrl + 'All',
      {
        headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token })
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
        complete: () => this.resetPage()
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

  private resetPage() {
    const prevConfiguration = this.router.routeReuseStrategy.shouldReuseRoute;
     this.router.routeReuseStrategy.shouldReuseRoute = () => false;
     this.router.onSameUrlNavigation = "reload";
     this.router.navigate(["./projects"], { relativeTo: this.route }).then(() => {
         this.router.routeReuseStrategy.shouldReuseRoute = prevConfiguration;
         this.router.onSameUrlNavigation = "ignore";
     });
   }
}
