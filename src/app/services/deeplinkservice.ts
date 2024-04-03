import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeeplinkService {
  
  constructor() {}

  checkDevice(){
    let ua = navigator.userAgent.toLowerCase();
    let isAndroid = ua.indexOf("android") > -1; // android check
    let isIphone = ua.indexOf("iphone") > -1; // ios check
    if(isAndroid){
      return "Android";
    }
    else if(isIphone){
      return "IOS";
    }
    else{
      return "Web";
    }
  }
  
  deeplink(parameter:any) {
    let ua = navigator.userAgent.toLowerCase();
    let isAndroid = ua.indexOf("android") > -1; // android check
    let isIphone = ua.indexOf("iphone") > -1; // ios check
    if (isIphone == true) {
     let app = { 
       launchApp: function() {
        window.location.href = "Gohfr://" + parameter; //which page to open(now from mobile, check its authorization)
        console.log("Gohfr://" + parameter);
       },
       openWebApp: function() {
        window.location.href = "https://itunes.apple.com/us/app/appname/appid";
       }
   };
   app.launchApp();
  } else if (isAndroid== true) {
     let app = { 
       launchApp: function() {
         window.location.replace("gohfr://gohfr.com/?=" + parameter.toString().replace("-", "=")); //which page to open(now from mobile, check its authorization)
         console.log("gohfr://gohfr.com/?=" + parameter.toString().replace("-", "="));
       },
       openWebApp: function() {
         window.location.href =  "https://play.google.com/store/apps/details?id=packagename";
       }
   };
   app.launchApp();
  }else{
   console.log("Inside a web page");
  }
 }
}
