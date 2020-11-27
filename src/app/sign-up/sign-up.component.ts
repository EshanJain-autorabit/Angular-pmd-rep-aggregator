import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpInfo } from '../_models/SignupInfo';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup ;
  signUpInfo: SignUpInfo;
  submitted = false;
  isSignUpFailed = false;
  error = '';
  loading = false;
  success = '';

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/home']);
    }
   }

  get f(): any{ return this.signUpForm.controls; }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['',[Validators.required,Validators.email]],
      password: ['', Validators.required]
  });
  }

  onSubmit(): void {

    this.submitted = true;

    // stop here if form is invalid
    if (this.signUpForm.invalid) {
        return;
    }
    this.signUpInfo = new SignUpInfo( this.f.username.value, this.f.email.value, this.f.password.value);
    console.log(this.signUpInfo);
    this.loading = true;
    this.authenticationService.signUp(this.signUpInfo)
        .subscribe(data => {
          console.log(data);
          this.isSignUpFailed = false;
          this.loading = false ;
          this.success = data.message;
          setTimeout(() => { this.login(); }, 2000);
        },
        error => {
          console.log(error);
          this.error = error;
          this.isSignUpFailed = true;
          this.loading = false;
        });
}

login(): void{
  this.router.navigate(['/login']);
}

}
