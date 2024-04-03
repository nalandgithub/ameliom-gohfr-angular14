import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { ApiService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://localhost:7287/api';
  
  constructor(private http: HttpClient, private config: ConfigService, private api: ApiService) { }

  getAll(): Observable<any> {
      return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: string): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  create(params: any): Observable<any> {
      return this.http.post(this.apiUrl, params);
  }

  update(id: string, params: any) : Observable<any>{
      return this.http.put(`${this.apiUrl}/${id}`, params);
  }

  delete(id: string): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${id}`);
  }


  login(userName:string, password:string) {
    const parammodel = {
        userName: userName,
        password: password
      };
      return this.api.postRequest(this.config.get('login'), parammodel);
  }
}
