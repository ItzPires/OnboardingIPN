import { HttpHeaders } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IProjects } from "./IProjects";


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projectsUrl = 'http://localhost:5000/api/Project/';

  constructor(private http: HttpClient) { }

  getProjects(token: string | null | undefined): Observable<IProjects[]> {
    return this.http.get<IProjects[]>(this.projectsUrl + 'GetManagerProjects', { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token }) });

  }
}
