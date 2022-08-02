import { HttpHeaders } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../user/user.service";
import { IProjects } from "./common/IProjects";
import { IProjectsID } from "./projects-list/IProjectsID";


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projectsUrl = 'http://localhost:5000/api/Project/';

  constructor(private userService: UserService, private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  public getProjects(): void {

  }


  public getProjectsGet(token: string | null | undefined): Observable<IProjectsID[]> {
    return this.http.get<IProjectsID[]>(
      this.projectsUrl + 'GetManagerProjects',
      {
        headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token })
      }
    );
  }

  public getProjectByIDGet(token: string | null | undefined, idProject : number): Observable<any> {
    return this.http.get(
      this.projectsUrl + idProject,
      {
        headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token })
      }
    );
  }

  private newProjectPost(token: string | null | undefined, projectForm: IProjects): Observable<any> {
    return this.http.post(
      this.projectsUrl + 'Add',
      projectForm,
      {
        headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token })
      }
    );
  }

  public newProject(projectForm: IProjects): void {
    this.newProjectPost(this.userService.getToken(), projectForm).subscribe(
      {
        error: (error) => this.onHttpError("Error: " + error),
        complete: () => this.router.navigate(['projects'])
      }
    );
  }

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