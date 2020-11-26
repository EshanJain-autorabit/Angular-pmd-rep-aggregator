import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Org } from '../_models/Org';
import { AnalysisService } from '../_services/analysis.service';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-select-org',
  templateUrl: './select-org.component.html',
  styleUrls: ['./select-org.component.css'],
})
export class SelectOrgComponent implements OnInit {
  orgs: Org[];
  selectedOrg: Org;
  disabled = true;
  isOrgPresent = false;
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private analysisService: AnalysisService
  ) {
    this.authService.currentUser.subscribe((loginResponse) => {
      this.orgs = loginResponse.user.orgs;
      // this.orgs = [];
      if (this.orgs.length > 0) {
        this.isOrgPresent = true;
      }
    });
  }

  ngOnInit(): void {}
  change(): void {
    if (this.selectedOrg == null) {
      this.disabled = true;
    } else {
      this.disabled = false;
      // console.log(this.selectedOrg.id.orgId);
    }
  }

  nextPage(): void {
    this.analysisService.setOrgId(this.selectedOrg.id.orgId);
    //console.log(this.analysisService.getOrgId());
    this.router.navigate(['/select apex class', this.selectedOrg.id.orgId]);
  }
}
