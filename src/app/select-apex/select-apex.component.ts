import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrgId } from '../_models/OrgId';
import { OrgService } from '../_services/org.service';
import {MessageService} from 'primeng/api';
import { AnalysisService } from '../_services/analysis.service';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-select-apex',
  templateUrl: './select-apex.component.html',
  styleUrls: ['./select-apex.component.css'],
  providers: [MessageService]
})
export class SelectApexComponent implements OnInit{
  orgId: OrgId ;
  apexClasses: string[];
  selectedClasses: string[];
  isApexClassesPresent = false ;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private orgService: OrgService,
    private messageService: MessageService,
    private analysisService: AnalysisService,
    private router: Router,
    private authService: AuthenticationService
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('orgId');
      this.orgId = new OrgId(id) ;
      this.apexClasses = [];
     // this.apexClasses.push('MyClass.cls', 'SecondClass.cls');
      this.getApexClasses();
      // this needs to be comment
    //  this.loading = false;
    //  this.isApexClassesPresent = true;
  });
  }

  getApexClasses(): void{
    this.orgService.getApexClasses(this.orgId).subscribe(apexClassesResponse => {
        this.apexClasses = apexClassesResponse.apexClasses;
        this.loading = false;
        if (this.apexClasses.length > 0)
        {
          this.isApexClassesPresent = true;
        }
        console.log(this.apexClasses.length + ' ' + this.apexClasses) ;
    });
  }

  nextPage(): void{

    if (this.selectedClasses == null || this.selectedClasses.length === 0)
    {
      this.messageService.add({key: 'bc', severity: 'error', summary: 'Error', detail: 'Please Select atleast one Apex Class'});
      return ;
    }
    this.analysisService.setApexClasses(this.selectedClasses);
    this.authService.currentUser.subscribe(loginResponse => {
      const storedRulesets = loginResponse.user.rulesets;
      let storedRules = [];
      if (storedRulesets != null && storedRulesets.length > 0){
      storedRules = storedRulesets[0].rules.split(',');
      }
      this.analysisService.setRules(storedRules);
    });
    this.router.navigate(['/view report']);
  }
}
