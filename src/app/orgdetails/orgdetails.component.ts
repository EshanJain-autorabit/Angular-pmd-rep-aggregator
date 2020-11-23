import { AotSummaryResolver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { element } from 'protractor';
import { LoginResponse } from '../_models/LoginResponse';
import { Org } from '../_models/Org';
import { Version } from '../_models/version';
import { AuthenticationService } from '../_services/authentication.service';
import { OrgService } from '../_services/org.service';

@Component({
  selector: 'app-orgdetails',
  templateUrl: './orgdetails.component.html',
  styleUrls: ['./orgdetails.component.css'],
})
export class OrgdetailsComponent implements OnInit {
  orgName = '';
  selectedVersion: Version;
  versions: Version[];
  orgs: Org[];
  orgs1: Org[];
  summary = '';
  message = '';
  constructor(
    private authService: AuthenticationService,
    private orgService: OrgService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.versions = [];
    for (let i = 50; i >= 30; i--) {
      this.versions.push(new Version(Number(i).toFixed(1)));
    }
    this.route.queryParamMap.subscribe((params) => {
      this.message = params.get('message');
    });

    }

ngOnInit(): void {
    if (this.message === 'success') {
      this.getOrg();
      this.router.navigate(['/user profile']);
    }
    this.refresh();
  }

  refresh(): void{
    this.authService.currentUser.subscribe(loginResponse => {
      this.orgs = loginResponse.user.orgs ;
      if (this.orgs.length > 0) {
        this.summary = 'Click refresh if you not find your registered Org.';
      }
      else {
        this.summary = 'No Registered Org found. Please Register One.';
      }
    });
    // console.log(this.orgs);
  }

getOrg(): void{
      this.orgService.getOrg().subscribe(orgs => {
        this.orgs1 = orgs ;
        // console.log(orgs);
        if (this.orgs1 !== undefined ) {
          const login: LoginResponse = JSON.parse(localStorage.getItem('currentUser'));
          login.user.orgs = this.orgs1;
          localStorage.setItem('currentUser', JSON.stringify(login));
          this.authService.currentUserValue = login ;
       }
        this.refresh();
       });
  }

addOrg(): void {
    if (this.orgName.length < 2 ) {
      alert(' org name cannot be empty');
      return;
    }
    if ( this.selectedVersion == null){
      alert(' Select api version');
      return;
    }
    const email = this.authService.currentUserValue.user.email;
    const data = email + ',' + this.orgName + ',' + this.selectedVersion.version;
    const state = btoa(data);
    // console.log(
    //   email + ' @@@@@@@@@@@  @@@@@ \n \n \n' + state + ' \n \n \n' + atob(state)
    // );
    const url =
      'https://login.salesforce.com/services/oauth2/authorize?' +
      'client_id=3MVG9n_HvETGhr3A9b6vwY7kpQRZo57VT6U9j1gnh2l2JX7G1cGRXjW5GE.eusqTgBRwxsQ0BynPaW17UQpmR&' +
      'redirect_uri=http://localhost:8081/api/auth/callback&' +
      'response_type=code&' +
      'state=' +
      state;
    open(url, '_self');
  }
}
