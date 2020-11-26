import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { OrgdetailsComponent } from './orgdetails/orgdetails.component';
import { RulesetSelectionComponent } from './ruleset-selection/ruleset-selection.component';
import { JwtInterceptor } from './_interceptors/JwtInterceptor';
import { ErrorInterceptor } from './_interceptors/ErrorInterceptor';
import { SelectOrgComponent } from './select-org/select-org.component';
import { SelectApexComponent } from './select-apex/select-apex.component';
import { ViewReportComponent } from './view-report/view-report.component';

import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {CardModule} from 'primeng/card';
import {RippleModule} from 'primeng/ripple';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {FieldsetModule} from 'primeng/fieldset';
import {StepsModule} from 'primeng/steps';
import {CheckboxModule} from 'primeng/checkbox';
import {ToastModule} from 'primeng/toast';
import {MultiSelectModule} from 'primeng/multiselect';
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
    ViewReportComponent,
    RulesetSelectionComponent
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
    MultiSelectModule
    TreeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
