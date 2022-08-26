import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "../shared/api.service";
import { UserService } from "../user/user.service";
import { IProjects } from "./common/IProjects";
import { IProjectsID } from "./projects-list/IProjectsID";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService extends ApiService<IProjects> {

  constructor(private userService: UserService,  http: HttpClient) {
    const projectsUrl = 'Project';
    super(http, projectsUrl);

  }

  public getProjects(): Observable<IProjectsID[]> {
    return this.getSpecific('GetManagerProjects', this.userService.getHeader());
  }

  public getProjectByID(idProject: number): Observable<IProjectsID> {
    return this.getById(idProject, this.userService.getHeader());
  }

  public updateProject(projectId: number, projectForm: IProjects): Observable<IProjectsID> {
    return this.update(projectId, projectForm, this.userService.getHeader());
  }

  public newProject(projectForm: IProjects): Observable<IProjectsID> {
    return this.post(projectForm, "Add", this.userService.getHeader());

  }

  public deleteProject(projectId: number): Observable<IProjectsID> {
    return this.delete(projectId, this.userService.getHeader());
  }

}
