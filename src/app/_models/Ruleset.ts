import { RuleSetId } from './RuleSetId';

export class Ruleset{
    rulesetId: RuleSetId;
    rules: string;

    constructor(rulesetId: RuleSetId, rules: string){
      this.rulesetId = rulesetId;
      this.rules = rules;
    }
}

