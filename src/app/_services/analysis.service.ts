import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  private apexClasses: string[];
  private orgID: string ;
  private rules: string[];

  constructor() { }

  public setApexClasses(apexClasses: string[]): void{
     this.apexClasses = apexClasses ;
  }

  public getApexClasses(): string[]{
    return this.apexClasses ;
 }

 public setRules(rules: string[]): void{
  this.rules = rules ;
}

public getRules(): string[]{
 return this.rules ;
}

 public setOrgId(orgId: string): void{
  this.orgID = orgId ;
}

public getOrgId(): string{
 return this.orgID ;
}

}
