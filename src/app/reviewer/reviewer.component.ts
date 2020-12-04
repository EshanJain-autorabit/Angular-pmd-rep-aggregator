import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AnalysisService } from '../_services/analysis.service';

@Component({
  selector: 'app-reviewer',
  templateUrl: './reviewer.component.html',
  styleUrls: ['./reviewer.component.css']
})
export class ReviewerComponent implements OnInit {
  recipients: string[];
  constructor(
    private route: ActivatedRoute,
    private analysisService: AnalysisService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  nextPage(): void{
    this.analysisService.setRecipients(this.recipients);
    this.router.navigate(['/view report']);
  }

}
