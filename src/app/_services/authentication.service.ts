import { Injectable } from '@angular/core';
import { BehaviorSubject,  Observable } from 'rxjs';
import { User } from '../_models/user';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LoginInfo } from '../_models/LoginInfo';
import { SignUpInfo } from '../_models/SignupInfo';
import { LoginResponse } from '../_models/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private key = 'currentUser';
  private currentUserSubject: BehaviorSubject<LoginResponse>;
  public currentUser: Observable<LoginResponse>;
  private loginUrl = 'http://localhost:8081/api/auth/signin';
  private signupUrl = 'http://localhost:8081/api/auth/signup';

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<LoginResponse>(JSON.parse(localStorage.getItem(this.key)));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): LoginResponse {
    return this.currentUserSubject.value;
}

public set currentUserValue(loginResponse: LoginResponse){
   this.currentUserSubject.next(loginResponse);
}

login(credentials: LoginInfo): Observable<LoginResponse>{
    return this.http.post<any>(this.loginUrl, credentials)
        .pipe(map(loginResponse => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem( this.key , JSON.stringify(loginResponse));
            this.currentUserSubject.next(loginResponse);
            return loginResponse;
        }));
}

signUp(info: SignUpInfo): Observable<any> {
  return this.http.post(this.signupUrl, info);
}


logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem(this.key);
    this.currentUserSubject.next(null);
}

}
