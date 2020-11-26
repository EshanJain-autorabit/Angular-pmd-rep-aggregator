import { TransitiveCompileNgModuleMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { Tree } from 'primeng/tree';
import { PmdRequest } from '../_models/PmdRequest';
import { PmdFile } from '../_models/_pmd/PmdFile';
import { Report } from '../_models/_pmd/Report';
import { Violation } from '../_models/_pmd/Violation';
import { AnalysisService } from '../_services/analysis.service';
import { OrgService } from '../_services/org.service';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.css']
})
export class ViewReportComponent implements OnInit {
   pmdRequest: PmdRequest;
   report: string;
   pmdReportObj: Report;
   apexClasses: string[];
   files = 0;
   violations = 0;
   priority1 = 0;
   priority3 = 0;
   priority5 = 0;
   nodes: TreeNode[];
   nodeInt: TreeNode[];
  constructor(
    private analysisService: AnalysisService,
    private router: Router,
    private orgService: OrgService
    ) { }

  ngOnInit(): void {
    if (this.valid()){
    this.getReport();
    }
  }


   getReport(): void{
    this.pmdRequest = new PmdRequest(
      this.analysisService.getApexClasses(),
      this.analysisService.getOrgId(),
      this.analysisService.getRules() );
    this.orgService.getApexReport(this.pmdRequest).subscribe((pmdReport) => {
      this.report = pmdReport.report ;
      this.pmdReportObj = JSON.parse(this.report);
      console.log(this.pmdReportObj.files);
      this.trimApexClassName(this.pmdReportObj.files);
      // console.log(pmdReport.report);
    });

   }


   trimApexClassName(apexClass: PmdFile[]): void{
     this.apexClasses = [];
     this.nodes = [];
     for ( const file of apexClass){
       this.files++;
       let filename = file.filename ;
       filename = filename.substring(filename.lastIndexOf('\\') + 1);
       this.nodeInt = this.createChildrens(file.violations);
       this.apexClasses.push(filename);
       this.nodes.push({label: filename, children: this.nodeInt});
     }
    // this.nodes =  [{ label: 'files', children: this.nodes }];
   }

  valid(): boolean{
    // console.log(this.analysisService.getOrgId());
    if (this.analysisService.getOrgId() == null || this.analysisService.getOrgId() === ''){
      this.router.navigate(['/select org']);
      return false;
   }
  //  else if (this.analysisService.getRules() == null || this.analysisService.getRules().length === 0){
  //     this.router.navigate(['/select apex class', this.analysisService.getOrgId()]);
  //  }

    return true;

  }

  createChildrens(violations: Violation[]): TreeNode[]{
    this.nodeInt = [];
    for (const violation of violations){
      this.violations++;
      this.setPriority(violation.priority);
      this.nodeInt.push({label: violation.rule,
        children: [{  label: violation.description + ' at line ' + violation.beginline, type: 'desc'},
        {label: 'Priority : ' + violation.priority , type: 'prior'
        }],
        type: 'viol' });
     }
    return this.nodeInt;
  }

  setPriority(priority: number): void{
     if (priority === 1 ){
       this.priority1++;
     }
     else if (priority === 3 ){
      this.priority3++;
    }
    else if (priority === 5 ){
      this.priority5++;
    }
  }

}
