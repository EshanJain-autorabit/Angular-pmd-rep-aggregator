import { TransitiveCompileNgModuleMetadata } from '@angular/compiler';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { HighService } from '../high.service';
import { PmdRequest } from '../_models/PmdRequest';
import { ApexCode } from '../_models/_pmd/ApexCode';
import { PmdFile } from '../_models/_pmd/PmdFile';
import { Report } from '../_models/_pmd/Report';
import { Violation } from '../_models/_pmd/Violation';
import { AnalysisService } from '../_services/analysis.service';
import { OrgService } from '../_services/org.service';

interface ReportData{
  violations: string[];
  apexCode: string[];
}

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.css']
})
export class ViewReportComponent implements OnInit , AfterViewChecked{
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
   loading = true;
   apexCode: ApexCode[];
   mapApexCode: Map<string, string[]> ;
   data: string[];
  constructor(
    private analysisService: AnalysisService,
    private router: Router,
    private orgService: OrgService,
    private highlightService: HighService
    ) { }

    ngAfterViewChecked(): void{
      this.highlightService.highlightAll();
    }

  ngOnInit(): void {
    this.data = [];
    this.data.push('public class Myclass {', ' //fdsfsaf', ' }');
    if (this.valid()){
    this.getReport();
    }
  }


   getReport(): void{
    this.pmdRequest = new PmdRequest(
      this.analysisService.getApexClasses(),
      this.analysisService.getOrgId(),
      this.analysisService.getRules() );
      this.pmdRequest.setMailList(this.analysisService.getRecipients());
    this.files = this.analysisService.getApexClasses().length ;
    this.orgService.getApexReport(this.pmdRequest).subscribe((pmdReport) => {
      this.report = pmdReport.report ;
      this.apexCode = pmdReport.apexCode ;
      this.pmdReportObj = JSON.parse(this.report);
      this.createMapApexCode(this.apexCode);
      // console.log(this.pmdReportObj.files);
     // console.log(JSON.stringify(pmdReport.report));
      this.trimApexClassName(this.pmdReportObj.files);
      this.loading = false ;
      // console.log(pmdReport.report);
    });

   }

   createMapApexCode(classes: ApexCode[]): void{
       this.mapApexCode = new Map<string, string[]>();
       for ( const curClass of classes)
       {
          this.mapApexCode.set(curClass.className , curClass.classCode);
       }
      //  for (const entry of this.mapApexCode.entries()) {
      //   console.log(entry[0], entry[1]);
      // }

   }


   trimApexClassName(apexClass: PmdFile[]): void{
     this.apexClasses = [];
     this.nodes = [];
     for ( const file of apexClass){
       let filename = file.filename ;
       filename = filename.substring(filename.lastIndexOf('\\') + 1);
       this.apexClasses.push(filename);

      // this.nodeInt = this.createChildrens(file.violations);
      // this.nodes.push({label: filename, children: this.nodeInt});

       const apViolations = [];
       for (const apViolation of file.violations)
       {
        this.violations++;
        this.setPriority(apViolation.priority);
        apViolations.push(apViolation.description + ' at line ' + apViolation.beginline + ', Priority : ' + apViolation.priority );
       }
       this.nodes.push({label: filename, children: [
         {  data: {violations: apViolations} , type: 'viol'},
         {  data: {apexCode: this.mapApexCode.get(filename)} , type: 'code'}
        ]
      });
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
