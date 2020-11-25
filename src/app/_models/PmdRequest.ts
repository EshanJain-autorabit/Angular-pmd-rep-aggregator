 
 export class PmdRquest{
    apexClasses: string[];
    orgId: string;
    rules: string[];

    constructor(apexClasses: string[], orgId: string, rules: string[]){
        this.apexClasses = apexClasses;
        this.orgId = orgId;
        this.rules = rules;
    }
}