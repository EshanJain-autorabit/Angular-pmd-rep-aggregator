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

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard], children: [
    { path: '', redirectTo: '/selectOrg', pathMatch: 'full' },
    {path: 'selectOrg', component: SelectOrgComponent},
    {path: 'selectApexClass/:orgId', component: SelectApexComponent},
    {path: 'view report', component: ViewReportComponent},
  ]},
  {path: 'login', component: LoginComponent},
  {path: 'signUp', component: SignUpComponent},
  {path: 'orgDetails', component: OrgdetailsComponent},
  {path: 'user profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'ruleset', component: RulesetSelectionComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
