import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ConfigService} from './config.service';
import { StorageService } from './storage.service';
import 'rxjs';
const TOKEN_KEY = 'auth-token';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
    providedIn: 'root'
})
export class ApiService {
  apiBase: string;
  options: any;

  constructor(private http: HttpClient,
              private config: ConfigService,
              private storageService: StorageService) {
    this.apiBase = this.config.baseURL;
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-api-key': this.config.apikey
      })
    };
    this.options = httpOptions;
  }

  public addTokenToAuthHeader(token:string) {
    if(token == null) return;
    //httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer '+ this.accountService.getTokenData());
    this.options.headers = this.options.headers.set('Authorization', 'Bearer ' + token);
  }

  public removeTokenFromHeader() {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-api-key': this.config.apikey
      })
    };
    this.options = httpOptions;
  }

  public getRequest(path: string) {
    if(!this.options.headers.headers ||(this.options.headers.headers && (!this.options.headers.headers.get('authorization') || this.options.headers.headers.get('authorization').length == 0))) {
      var token = this.storageService.get(TOKEN_KEY);
      this.addTokenToAuthHeader(token);
    }
    const url = this.apiBase + path;
    const response = this.http.get(url, this.options);
    return response;
  }

  public getDocumentRequest(path: string) {
     var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-api-key': this.config.apikey
      })
    };
    var token = this.storageService.get(TOKEN_KEY);
    if(token != null){
      httpOptions.headers.append('Authorization', 'Bearer ' + token);
    }
    const url = this.apiBase + path;
    // httpOptions['responseType'] = 'blob';
    // const response = this.http.get(url, httpOptions);

    return ;// response;
  }

  
  public postRequest(path: string, body: any) {
    if(!this.options.headers.headers ||(this.options.headers.headers && (!this.options.headers.headers.get('authorization') || this.options.headers.headers.get('authorization').length == 0))) {
      var token = this.storageService.get(TOKEN_KEY);
      this.addTokenToAuthHeader(token);
    }
    
    const url = this.apiBase + path;
    const response = this.http.post(url, body, this.options);
    return response;
  }
  public postVoidRequest(path: string, body: any) {
    if(!this.options.headers.headers ||(this.options.headers.headers && (!this.options.headers.headers.get('authorization') || this.options.headers.headers.get('authorization').length == 0))) {
      var token = this.storageService.get(TOKEN_KEY);
      this.addTokenToAuthHeader(token);
    }

    const url = this.apiBase + path;
    const response = this.http.post(url, body, this.options);
    return response;
  }
  public putRequest(path: string, id: any, body: any) {
    if(!this.options.headers.headers ||(this.options.headers.headers && (!this.options.headers.headers.get('authorization') || this.options.headers.headers.get('authorization').length == 0))) {
      var token = this.storageService.get(TOKEN_KEY);
      this.addTokenToAuthHeader(token);
    }

    const url = this.apiBase + path + '/' + id;
    const response = this.http.put(url, body, this.options);
    return response;
  }
  public deleteRequest(path: string, id: any) {
    if(!this.options.headers.headers ||(this.options.headers.headers && (!this.options.headers.headers.get('authorization') || this.options.headers.headers.get('authorization').length == 0))) {
      var token = this.storageService.get(TOKEN_KEY);
      this.addTokenToAuthHeader(token);
    }
    
    const url = this.apiBase + path + '/' + id;
    const response = this.http.delete(url, this.options);
    return response;
  }
}
