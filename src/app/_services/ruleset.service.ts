import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { DefaultRuleset } from '../_models/DefaultRuleset';
import { RuleRequest } from '../_models/RuleRequest';

@Injectable({
    providedIn: 'root'
  })

  export class RulesetService {
    private baseUrl = 'http://localhost:8081/api';
    private url = this.baseUrl + "/auth/rules"; 
    constructor(private http: HttpClient) { }

    public getRulesForRulesets(defaultRulesets: DefaultRuleset): Observable<RuleRequest> {
      console.log(defaultRulesets);
        return this.http.post<RuleRequest>(this.url, defaultRulesets); 
    }

}