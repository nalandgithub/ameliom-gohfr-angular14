import { Injectable } from '@angular/core';
import serviceconfig from './serviceconfig.json'; // This import style requires "esModuleInterop", see "side notes"

import { Guid } from "guid-typescript";
@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    baseURL = '';
    public config: any = {};
    apikey ='';
    driverSignUpURL = '';
    androidAppUrl = '';
    IOSAppUrl = '';


    constructor() {
        this.baseURL = (<any>serviceconfig).baseURL + (<any>serviceconfig).apiBase;
        this.apikey = (<any>serviceconfig).apikey;
        this.config = (<any>serviceconfig).config;
        this.driverSignUpURL = (<any>serviceconfig).driverSignUpURL;
        this.androidAppUrl = (<any>serviceconfig).androidAppUrl;
        this.IOSAppUrl = (<any>serviceconfig).IOSAppUrl;

    }
    public get(optionName: any) {
        return this.config[optionName];
    }
    isPasswordValidate(value:string):boolean {
        let isValid:boolean;
         //const regexp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
         const regexp = new RegExp(/(?=.*[_!@#$%^&*-])(?=.*\d)(?!.*[.\n])(?=.*[a-z])(?=.*[A-Z])^.{8,}$/);
        isValid = regexp.test(value);
        return isValid;
    } 
    isEmailValidate(value: string): boolean {
        let isValid:boolean;
        const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        isValid = regexp.test(value);
        return isValid;
    }
    isPhoneValidate(value: string): boolean{
        let isValid:boolean;
        const regexp = new RegExp(/^[1-9]\d{2}-\d{3}-\d{4}$/);
        isValid = regexp.test(value);
        return isValid;
    }
    isSSNValidate(value: string): boolean{
        let isValid:boolean;
        const regexp = new RegExp(/^\d{3}-\d{2}-\d{4}$/);
        isValid = regexp.test(value);
        return isValid;
    }
    formatSSN(value: string): string {
        var numbers = value.replace(/\D/g, ''),
    char:any = { 3: '-', 5: '-'};
        value = '';
        for (var i = 0; i < numbers.length; i++) {
            value += (char[i] || '') + numbers[i];
        }
        return value;
    }
    formatPhone(value: string): string {
        var numbers = value.replace(/\D/g, ''),
    char:any = { 3: '-', 6: '-'};
        value = '';
        for (var i = 0; i < numbers.length; i++) {
            value += (char[i] || '') + numbers[i];
        }
        return value;
    }
    isZipValidate(value: string): boolean {
        let isValid:boolean;
        const regexp = new RegExp(/^\d{5}(?:[-\s]\d{4})?$/);
        isValid = regexp.test(value);
        console.log(isValid);
        return isValid;
    }
    formatZip(value: string): string {
        var numbers = value.replace(/\D/g, ''),
        char:any = { 5: '-'};
        value = '';
        for (var i = 0; i < numbers.length; i++) {
            value += (char[i] || '') + numbers[i];
        }
        return value;
    }
    getRandomSessionId(){
        return Guid.create().toString();
    }

    isDOBvalid(value: string): boolean {
        var inputDate = new Date(value);
        const date:Date = new Date();
        date.setFullYear( date.getFullYear() - 18 );        
        return inputDate < date;
    }
    
}
