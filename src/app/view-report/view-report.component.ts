import { Component, OnInit } from '@angular/core';
import { AnalysisService } from '../_services/analysis.service';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.css']
})
export class ViewReportComponent implements OnInit {

  constructor(private analysisService: AnalysisService) { }

  ngOnInit(): void {
    console.log(this.analysisService.getApexClasses() + this.analysisService.getOrgId());
  }

}
