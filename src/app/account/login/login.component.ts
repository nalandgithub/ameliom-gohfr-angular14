import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeeplinkService } from '../../services/deeplinkservice';
import { ConfigService } from 'src/app/services/config.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ApiService } from 'src/app/services/app.service';
import { AppComponent } from 'src/app/app.component';

enum userRoles { Admin = 1, Customer, Driver }

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private subscription?: Subscription;
  showme:boolean = true;
  brandNew?: boolean;
  errors?: string;
  isRequesting?: boolean;
  submitted: boolean = false;
  credentials: Credentials = { email: '', password: '' };
  unconfirmedEmail?: boolean;
  resendEmailTo?: string;
  driverSignUpURL?:string;
  public offset: any = { left: 0, top: 50 };
  
  constructor(private userService: UserService, private router: Router,private comp: AppComponent,
     private activatedRoute: ActivatedRoute,
   //  private authenticationService: AuthenticationService,
     private api: ApiService,private configService:ConfigService,
     private deepLinkService:DeeplinkService) { }

  ngOnInit() {
    debugger;
    localStorage.clear();
    this.driverSignUpURL = this.configService.driverSignUpURL;
    // setTimeout(_ =>  this.comp.isLoggedIn=false);
    // this.comp.updateLogoutBodyClass();
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (param: any) => {
        this.brandNew = param['brandNew'];
        this.credentials.email = param['email'];
      });
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  resendEmail() {
    // this.userService.resendEmail(this.resendEmailTo).subscribe(
    //   (result:any) => {
    //     window.location.reload();
    //   },
    //   (errors: any) => {
    //     this.errors = errors;
    //   });
    // this.unconfirmedEmail = false;
  }

  login({ value, valid }: { value: Credentials, valid: boolean }) {
    debugger;
    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';
    if (valid) {
      this.userService.login(value.email, value.password).subscribe(
        
        (res: any) => {
          debugger;
          if(res.message) {
            this.isRequesting = false;
            this.unconfirmedEmail = true;
            this.resendEmailTo = value.email;
            return;
          }
          localStorage.setItem('auth_token', res.authToken);
          localStorage.setItem('role', res.userRoleId);
          localStorage.setItem('id', res.id);
          localStorage.setItem('name', res.name);
          localStorage.setItem('emailaddress',res.emailAddress);
          localStorage.setItem('userid',res.userId);
          localStorage.setItem('isInvoiced',res.isInvoiced);
          localStorage.setItem('userPhoto',res.hasProfileImage);
          this.api.removeTokenFromHeader();
          this.navigateToMainPage(res.userRoleId, res.authToken);
        },
        (errors: any) => {
          this.errors = errors.message;
          this.isRequesting=false;
        });
    }
  }

  navigateToMainPage(role: userRoles, auth_token: any) {
    this.isRequesting = false;
    // this.authenticationService.login(auth_token, role == userRoles.Admin);
    // this.comp.isLoggedIn = true;
    // this.comp.updateBodyClass();

    if (role == userRoles.Admin) {
      this.router.navigate(['/admin/user-list']);
    } else if(role == userRoles.Customer) {
      localStorage.setItem("editId",localStorage.getItem("id")as any);
      this.router.navigate(['customer/new-delivery/']);
    } else if(role == userRoles.Driver) {
      localStorage.setItem("editId",localStorage.getItem("id") as any);
      this.router.navigate(['admin/edit-driver/',localStorage.getItem("id")]);
    }
  }

  openMobileApp(){
    let device = this.deepLinkService.checkDevice();
    if(device === "Android"){
      window.location.href = this.configService.androidAppUrl;
    }
    else if(device ===  "IOS"){
      window.location.href = this.configService.IOSAppUrl;
    }
  }

  isMobile(){
    debugger;
    let device = this.deepLinkService.checkDevice();
    if(device === "Android" || device === "IOS"){
      return true;
    }
    else{
      return false;
    }
  }
}
export interface Credentials {
  email: string;
  password: string;
}


