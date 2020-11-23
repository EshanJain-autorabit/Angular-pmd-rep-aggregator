import { Org } from './Org';
import { Ruleset } from './Ruleset';

export class User {
    userName: string;
    email: string;
    orgs: Org[];
    rulesets: Ruleset[];
}
