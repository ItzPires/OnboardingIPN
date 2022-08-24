import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cookies } from '../common/enums/Cookies';

export class ApiService<T> {

  apiProvider = 'http://localhost:5000/api/';

  Cookies = Cookies;

  constructor(protected http: HttpClient, private api: string) { }

  public getAll(header: HttpHeaders): Observable<any> {
    return this.http.get<T[]>(
      this.apiProvider + this.api + '/All',
      {
        headers: header,
      }
    );
  }

  public getById(id: number | string, header: HttpHeaders): Observable<any> {
    return this.http.get(
      this.apiProvider + this.api + "/" + id,
      {
        headers: header,
      }
    );
  }

  public getSpecific(url: string, header: HttpHeaders): Observable<any> {
    return this.http.get<T[]>(
      this.apiProvider + this.api + "/" + url,
      {
        headers: header,
      }
    );
  }

  public post(object: any, url: string, header: HttpHeaders): Observable<any> {
    return this.http.post(
      this.apiProvider + this.api + "/" + url,
      object,
      {
        headers: header,
      }
    );
  }

  public update(id: number, object: T, header: HttpHeaders): Observable<any> {
    return this.http.put(
      this.apiProvider + this.api + '/Update/' + id,
      object,
      {
        headers: header,
      }
    );
  }

  public delete(id: number, header: HttpHeaders): Observable<any> {
    return this.http.delete(this.apiProvider + this.api + "/" + id, {
      headers: header,
    });
  }

}
