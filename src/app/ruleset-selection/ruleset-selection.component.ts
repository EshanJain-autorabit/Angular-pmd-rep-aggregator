import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DefaultRuleset } from '../_models/DefaultRuleset';
import { LoginResponse } from '../_models/LoginResponse';
import { Rule } from '../_models/Rule';
import { RuleRequest } from '../_models/RuleRequest';
import { Ruleset } from '../_models/Ruleset';
import { AuthenticationService } from '../_services/authentication.service';
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
  storedRulesets: Ruleset[];
  storedRules: string[];
  // isRulesetSelected: boolean;
  // noRuleSelected: boolean;


  constructor(
    private rulesetService: RulesetService,
    private authService: AuthenticationService,
    private router: Router,
    ) {
    this.rulesets = ['Best Practices', 'Code Style', 'Design', 'Documentation', 'Error Prone', 'Performance', 'Security'];
    this.priority = 5;
    // console.log("In constrcutor");
    this.authService.currentUser.subscribe(loginResponse => {
      this.storedRulesets = loginResponse.user.rulesets;
      this.storedRules = [];
      if (this.storedRulesets != null && this.storedRulesets.length > 0){
        console.log(this.storedRulesets[0].rules);
        this.storedRules = this.storedRulesets[0].rules.split(',');
      }
    });
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
    this.save();
  }

  save(): void{
        if (this.rulePaths == null || this.rulePaths.length === 0)
       {
         return ;
       }
        const defRuleset = new DefaultRuleset(this.rulePaths);
        //console.log(defRuleset);
        this.rulesetService.saveRules(defRuleset).subscribe( data => {
          console.log(data.message);
          this.selectedRulesets = [];
          this.selectedRules = [];
          const login: LoginResponse = JSON.parse(localStorage.getItem('currentUser'));
          if(login.user.rulesets.length === 0){
            const ruleset = new Ruleset({rulesetName: 'rule'}, this.rulePaths.toString());
            const rulesets = [ruleset];
            login.user.rulesets = rulesets ;
          }
          login.user.rulesets[0].rules = this.rulePaths.toString();
          localStorage.setItem('currentUser', JSON.stringify(login));
          this.authService.currentUserValue = login ;
          this.refresh();
          alert('Saved Successfully');
       });
  }

  refresh(): void{
    this.authService.currentUser.subscribe(loginResponse => {
      this.storedRules = loginResponse.user.rulesets[0].rules.split(',') ;
      console.log('im here');
    });
    // console.log(this.orgs);
  }

}
