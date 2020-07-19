import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  private createRequestOptions() {
    return new HttpHeaders({
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS, DELETE',
      'Access-Control-Allow-Headers' : 'Accept,Accept-Language,Content-Language,Content-Type',
      'Access-Control-Expose-Headers' : 'Content-Length,Content-Range',
        "Content-Type": "application/json"
    });
  }
  encodeObjectToParams(obj: any): string {
    return Object.keys(obj).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])).join('&');
  }
  public get<T>(path: string): Observable<T> {
    return this.http.get<T>(environment.urlApi + path, { headers: this.createRequestOptions() })
  }
  public post<T>(path: string, body: object): Observable<T>{ 
    return this.http.post<T>(environment.urlApi + path, body, { headers: this.createRequestOptions() });
  }
  public put<T>(path: string, body: object| string): Observable<T>{ 
    return this.http.put<T>(environment.urlApi + path, body, { headers: this.createRequestOptions() })
  }
  public delete<T>(path: string, body?: object): Observable<T>{ 
    return this.http.delete<T>(environment.urlApi + path, body)
  }

}
