import { HttpClient } from "@angular/common/http";
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

  constructor(userService: UserService, http: HttpClient) {
    const projectsUrl = 'Project';
    super(userService, http, projectsUrl);
  }

  public getProjects(): Observable<IProjectsID[]> {
    return this.getSpecific('GetManagerProjects');
  }

  public getProjectByID(idProject: number): Observable<IProjectsID> {
    return this.getById(idProject);
  }

  public updateProject(projectId: number, projectForm: IProjects): Observable<IProjectsID> {
    return this.update(projectId, projectForm);
  }

  public newProject(projectForm: IProjects): Observable<IProjectsID> {
    return this.post(projectForm);

  }

  public deleteProject(projectId: number): Observable<IProjectsID> {
    return this.delete(projectId);
  }

}
