import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { LoginInfo } from '../_models/LoginInfo';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    error = '';
    loginInfo: LoginInfo ;

  constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }
  get f(): any{ return this.loginForm.controls; }

  onSubmit(): void {

      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }
      this.loginInfo = new LoginInfo( this.f.username.value, this.f.password.value);
      console.log(this.f.username.value+' '+this.f.password.value);
      this.loading = true;
      this.authenticationService.login(this.loginInfo)
          .pipe(first())
          .subscribe({
              next: () => {
                  // get return url from route parameters or default to '/'
                //  const returnUrl = this.route.snapshot.queryParams[ ' returnUrl ' ] || '/';
                  this.router.navigate(['/home']);
              },
              error: error => {
                  this.error = error;
                  this.loading = false;
              }
          });
  }
    signUp(): void{
            this.router.navigate(['/signUp']);
    }


}
