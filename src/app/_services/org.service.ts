import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApexClassesResponse } from '../_models/ApexClassesResponse';
import { Org } from '../_models/Org';
import { OrgId } from '../_models/OrgId';

@Injectable({
  providedIn: 'root'
})
export class OrgService {
  private baseUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) { }

  getOrg(): Observable<Org[]>{
    return this.http.get<Org[]>(this.baseUrl + '/org');
  }

  getApexClasses(orgId: OrgId): Observable<ApexClassesResponse>{
      return this.http.post<ApexClassesResponse>(this.baseUrl + '/retrieve', orgId);
  }

  getApexReport(apexClassesResponse: ApexClassesResponse): Observable<string>{
    return this.http.post<string>(this.baseUrl + '/report', apexClassesResponse);
}
}
