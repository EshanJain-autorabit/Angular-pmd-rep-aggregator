import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Org } from '../_models/Org';

@Injectable({
  providedIn: 'root'
})
export class OrgService {
  private baseUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) { }

  getOrg(): Observable<Org[]>{
    return this.http.get<Org[]>(this.baseUrl + '/org');
  }
}
