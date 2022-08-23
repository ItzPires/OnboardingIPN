import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { States } from '../common/states';
import { ProjectsService } from '../projects.service';
import { IProjectsID } from './IProjectsID';
import { MatDialog } from '@angular/material/dialog';
import { ProjectNewComponent } from '../project-new/project-new.component';
import { ProjectDeleteComponent } from '../project-delete/project-delete.component';
import { IResponse } from 'src/app/common/Iresponse';
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
  originalProjects: IProjectsID[] = [];
  errorProjects: IResponse = {
    error: false,
    done: false
  }
  searchString: string = '';
  page = 1;
  pageSize = 5;

  constructor(public projectsService: ProjectsService, private userService: UserService, public router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.token = this.userService.getToken();
    this.roleUser = this.userService.getRole();

    this.projectsService.getProjects().subscribe({
      next: (dataProjects: IProjectsID[]) => {
        this.projects = dataProjects;
        this.originalProjects = dataProjects;
      },
      error: () => { this.errorProjects.error = true; },
      complete: () => { this.errorProjects.done = true; }
    });
  }

  onDelete(id: number): void {
    this.projectsService.deleteProject(id).subscribe({
      next: () => {
        this.projects = this.projects.filter(project => project.id !== id);
      }
    });
  }

  openDialog(projectName: string, id: number): void {
    var dialog = this.dialog.open(ProjectDeleteComponent, {
      width: '250px',
      data: {
        projectName: projectName,
        id: id
      }
    });
    dialog.afterClosed().subscribe(
      data => { if (data) { this.onDelete(id); } }
    );
  }

  newProject(): void {
    var dialog = this.dialog.open(ProjectNewComponent, {
      width: '600px'
    });

    dialog.afterClosed().subscribe(() => {
      this.projectsService.getProjects().subscribe({
        next: (dataProjects: IProjectsID[]) => {
          this.projects = dataProjects;
        },
        error: () => { this.errorProjects.error = true; },
        complete: () => { this.errorProjects.done = true; }
      });
    })
  }

  onSearch(search: string): void {
    search = search.toLowerCase();
    this.projects = this.originalProjects.filter(project => project.name.toLowerCase().includes(search));
  }

}
