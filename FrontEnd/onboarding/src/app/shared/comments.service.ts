import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICommentUserString } from '../tasks/ICommentUserString';
import { UserService } from '../user/user.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CommentsService extends ApiService<ICommentUserString> {

  header: HttpHeaders;

  constructor(userService: UserService, http: HttpClient) {
    const commentUrl = 'Comment';
    super(http, commentUrl);

    this.header = new HttpHeaders({ 'Authorization': 'Bearer ' + userService.getCookie(this.Cookies.Token) });
  }


  public newCommentary(CommentForm: ICommentUserString): Observable<ICommentUserString> {
    return this.post(CommentForm, "Add", this.header);
  }


  public getCommentsByTask(idTask : number): Observable<any> {
    return this.getById(idTask, this.header);
  }
}
