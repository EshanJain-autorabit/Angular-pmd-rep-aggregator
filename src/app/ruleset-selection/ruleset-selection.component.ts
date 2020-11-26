import { Component, OnInit } from '@angular/core';
import { DefaultRuleset } from '../_models/DefaultRuleset';
import { Rule } from '../_models/Rule';
import { RuleRequest } from '../_models/RuleRequest';
import { RulesetService } from '../_services/ruleset.service';

@Component({
  selector: 'app-ruleset-selection',
  templateUrl: './ruleset-selection.component.html',
  styleUrls: ['./ruleset-selection.component.css']
})

export class RulesetSelectionComponent implements OnInit {

  rulesets: string[] ;
  selectedRulesets : string[];
  setMinimumPriority: number;
  rules: Rule[];
  selectedRules: Rule[];
  rulePaths: string[];
  ruleReq: RuleRequest;
  isRulesetSelected: boolean;
  headers: string[];
  noRuleSelected: boolean;

  constructor(private rulesetService: RulesetService) {
    this.rulesets= ["Best Practices", "Code Style", "Design", "Documentation", "Error Prone", "Performance", "Security"];
    this.isRulesetSelected = false;
    this.noRuleSelected = false;
    // console.log("In constrcutor");
  }

  ngOnInit(): void {}

  getRuleDropdownData(selectedRulesets: string[]){
    // console.log("Http Req body:" + this.selectedRulesets);
    const defRuleset = new DefaultRuleset(selectedRulesets);
    console.log("request obj "+ defRuleset);
    this.rulesetService.getRulesForRulesets(defRuleset)
    .subscribe(resp => {this.rules = resp.rules; 
    // console.log(resp);
  });
  }

  submitRulePaths(selectedRules: Rule[]){
    for( var index in selectedRules ){
        this.rulePaths.concat(selectedRules[index].rulePath);
    }
    console.log("Submit Rule Paths rulepaths: " + this.rulePaths.entries);
    return this.rulePaths;
  }

}