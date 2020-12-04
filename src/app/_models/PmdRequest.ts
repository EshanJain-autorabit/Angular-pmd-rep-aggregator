 export class PmdRequest{
    apexClasses: string[];
    orgId: string;
    rules: string[];
    mailList: string[];

    constructor(apexClasses: string[], orgId: string, rules: string[]){
        this.apexClasses = apexClasses;
        this.orgId = orgId;
        this.rules = rules;
    }

    public setMailList(mailList: string[]){
        this.mailList = mailList;
    }
}
