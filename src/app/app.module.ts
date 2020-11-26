import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CheckboxControlValueAccessor, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './_interceptors/JwtInterceptor';
import { ErrorInterceptor } from './_interceptors/ErrorInterceptor';
import {PasswordModule} from 'primeng/password';
import { FormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PanelModule} from 'primeng/panel';
import {CardModule} from 'primeng/card';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { OrgdetailsComponent } from './orgdetails/orgdetails.component';
import {RippleModule} from 'primeng/ripple';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {FieldsetModule} from 'primeng/fieldset';
import {StepsModule} from 'primeng/steps';
import { SelectOrgComponent } from './select-org/select-org.component';
import { SelectApexComponent } from './select-apex/select-apex.component';
import {CheckboxModule} from 'primeng/checkbox';
import {ToastModule} from 'primeng/toast';
import { ViewReportComponent } from './view-report/view-report.component';
import {TreeModule} from 'primeng/tree';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignUpComponent,
    UserProfileComponent,
    OrgdetailsComponent,
    SelectOrgComponent,
    SelectApexComponent,
    ViewReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    PasswordModule,
    ButtonModule,
    BrowserAnimationsModule,
    PanelModule,
    FormsModule,
    CardModule,
    RippleModule,
    OverlayPanelModule,
    InputTextModule,
    DropdownModule,
    TableModule,
    FieldsetModule,
    StepsModule,
    CheckboxModule,
    ToastModule,
    TreeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
