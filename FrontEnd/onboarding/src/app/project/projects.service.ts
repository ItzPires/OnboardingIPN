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
  header: HttpHeaders;

  constructor(private userService: UserService, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.header = new HttpHeaders({ 'Authorization': 'Bearer ' + this.userService.getToken() });
  }

  public getProjects(): Observable<IProjectsID[]> {
    return this.http.get<IProjectsID[]>(
      this.projectsUrl + 'GetManagerProjects',
      {
        headers: this.header,
      }
    );
  }

  public getProjectByID(idProject: number): Observable<any> {
    return this.http.get(
      this.projectsUrl + idProject,
      {
        headers: this.header,
      }
    );
  }

  public updateProject(projectId: number, projectForm: IProjects): Observable<any> {
    return this.http.put(
      this.projectsUrl + 'Update/' + projectId,
      projectForm,
      {
        headers: this.header,
      }
    );
  }

  public newProject(projectForm: IProjects): Observable<any> {
    return this.http.post(
      this.projectsUrl + 'Add',
      projectForm,
      {
        headers: this.header,
      }
    );
  }

  public deleteProject(projectId: number): Observable<any> {
    return this.http.delete(this.projectsUrl + projectId,
      {
        headers: this.header,
      });
  }

}
