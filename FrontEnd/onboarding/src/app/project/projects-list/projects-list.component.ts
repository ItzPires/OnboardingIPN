import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { States } from '../common/states';
import { ProjectsService } from '../projects.service';
import { IProjectsID } from './IProjectsID';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['../../common/styles.css']
})
export class ProjectsListComponent implements OnInit {
  token: string | null | undefined;
  roleUser: string | null | undefined;
  states = States;
  projects: IProjectsID[] = [];
  errorProjects: boolean = false;

  constructor(public projectsService: ProjectsService, private userService: UserService, public router: Router) { }

  ngOnInit(): void {
    this.token = this.userService.getToken();
    this.roleUser = this.userService.getRole();

    this.projectsService.getProjects().subscribe({
      next: (dataProjects: IProjectsID[]) => {
        this.projects = dataProjects;
      },
      error: () => {this.errorProjects = true;},
    });
  }

  onDelete(id: number): void {
    this.projectsService.deleteProject(id).subscribe({
      next: () => {
        this.projects = this.projects.filter(project => project.id !== id);
      }
    });
  }

  clickMethod(name: string) {
    if(confirm("Are you sure to delete "+name)) {
      console.log("Implement delete functionality here");
    }
  }

}
