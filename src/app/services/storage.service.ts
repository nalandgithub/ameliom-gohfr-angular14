import { Injectable } from '@angular/core';
 
@Injectable({
  providedIn: 'root'
})
export class StorageService {
    constructor() { }
    set(key: string, data: any) {
        return localStorage.setItem(key, JSON.stringify(data));
      }
    get(key: string): any {
        //return JSON.parse(localStorage.getItem(key));
    }
    remove(key: string) {
        //return localStorage.setItem(key, null);
    }
}
