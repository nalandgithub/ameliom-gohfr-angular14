import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './account/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopupModule } from '@progress/kendo-angular-popup';
import { SharedModule } from '@progress/kendo-angular-inputs';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule ,
    PopupModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule       
    
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
