import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

export class ApiService<T> {

  apiProvider = 'http://localhost:5000/api/';

  header: HttpHeaders;

  constructor(private userService: UserService, protected http: HttpClient, private api: string)
  {
    this.header = new HttpHeaders({ 'Authorization': 'Bearer ' + this.userService.getToken() });
  }

  public getAll(): Observable<any> {
    return this.http.get<T[]>(
      this.apiProvider + this.api + '/All',
      {
        headers: this.header,
      }
    );
  }

  public getById(id: number): Observable<any> {
    return this.http.get(
      this.apiProvider + this.api + "/" + id,
      {
        headers: this.header,
      }
    );
  }

  public getSpecific(url: string): Observable<any> {
    return this.http.get<T[]>(
      this.apiProvider + this.api + "/" + url,
      {
        headers: this.header,
      }
    );
  }

  public post(object: any): Observable<any> {
    return this.http.post(
      this.apiProvider + this.api + "/Add",
      object,
      {
        headers: this.header,
      }
    );
  }

  public update(id: number, object: T): Observable<any> {
    return this.http.put(
      this.apiProvider + this.api + '/Update/' + id,
      object,
      {
        headers: this.header,
      }
    );
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.apiProvider + this.api, {
      headers: this.header,
    });
  }

}
