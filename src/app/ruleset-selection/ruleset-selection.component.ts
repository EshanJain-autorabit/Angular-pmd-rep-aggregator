import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DefaultRuleset } from '../_models/DefaultRuleset';
import { Rule } from '../_models/Rule';
import { RuleRequest } from '../_models/RuleRequest';
import { AnalysisService } from '../_services/analysis.service';
import { RulesetService } from '../_services/ruleset.service';

@Component({
  selector: 'app-ruleset-selection',
  templateUrl: './ruleset-selection.component.html',
  styleUrls: ['./ruleset-selection.component.css']
})

export class RulesetSelectionComponent implements OnInit {

  rulesets: string[] ;
  selectedRulesets: string[];
  priority: number;
  rules: Rule[];
  selectedRules: Rule[];
  rulePaths: string[];
  ruleReq: RuleRequest;
  // isRulesetSelected: boolean;
  // noRuleSelected: boolean;


  constructor(
    private rulesetService: RulesetService,
    private analysisService: AnalysisService,
    private router: Router
    ) {
    this.rulesets = ['Best Practices', 'Code Style', 'Design', 'Documentation', 'Error Prone', 'Performance', 'Security'];
    this.priority = 5;
    // console.log("In constrcutor");
  }

  ngOnInit(): void {}

  getRuleDropdownData(selectedRulesets: string[]): void{
    // console.log("Http Req body:" + this.selectedRulesets);
    const defRuleset = new DefaultRuleset(selectedRulesets);
    console.log('request obj ' + defRuleset);
    this.rulesetService.getRulesForRulesets(defRuleset)
    .subscribe(resp => {this.rules = resp.rules;
    // console.log(resp);
  });
  }

  submitRulePaths(selectedRules: Rule[]): void{
    console.log(selectedRules);
    this.rulePaths = [];
    for ( const rule of selectedRules ){
        this.rulePaths.push(rule.rulePath);
    }
    console.log('Submit Rule Paths rulepaths: ' + this.rulePaths);
    this.nextPage();
  }

  nextPage(): void{
        if (this.rulePaths == null || this.rulePaths.length === 0)
       {
         return ;
       }
        this.analysisService.setPriority(this.priority);
        this.analysisService.setRules(this.rulePaths);
        this.router.navigate(['/view report']);
  }

}
