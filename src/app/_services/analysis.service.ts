import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  private apexClasses: string[];
  private orgID: string ;
  private rules: string[];
  private priority: number;
  private emailRecipients: string[]

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

public setRecipients(recipients: string[]): void{
  this.emailRecipients = recipients ;
}

public getRecipients(): string[]{
 return this.emailRecipients ;
}

 public setOrgId(orgId: string): void{
  this.orgID = orgId ;
}

public getOrgId(): string{
 return this.orgID ;
}

public setPriority(priority: number): void {
  this.priority = priority;
}

public getPriority(): number{
  return this.priority;
}
}
