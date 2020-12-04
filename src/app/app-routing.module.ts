import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrgdetailsComponent } from './orgdetails/orgdetails.component';
import { SelectApexComponent } from './select-apex/select-apex.component';
import { SelectOrgComponent } from './select-org/select-org.component';
import { RulesetSelectionComponent } from './ruleset-selection/ruleset-selection.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ViewReportComponent } from './view-report/view-report.component';
import { AuthGuard } from './_services/auth-guard.service';
import { InfoComponent } from './info/info.component';
import { ReviewerComponent } from './reviewer/reviewer.component';


const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard], children: [
    { path: '', redirectTo: 'select org', pathMatch: 'full' },
    {path: 'select org', component: SelectOrgComponent},
    {path: 'select apex components/:orgId', component: SelectApexComponent},
    {path: 'reviewer', component: ReviewerComponent },
    {path: 'view report', component: ViewReportComponent},

  ]},
  {path: 'login', component: LoginComponent},
  {path: 'signUp', component: SignUpComponent},
  {path: 'org details', component: OrgdetailsComponent, canActivate: [AuthGuard]},
  {path: 'ruleset', component: RulesetSelectionComponent, canActivate: [AuthGuard] },
  {path: 'user profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'overview', component: InfoComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
