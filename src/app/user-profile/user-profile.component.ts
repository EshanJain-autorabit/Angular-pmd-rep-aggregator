import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User;

  constructor( private authService: AuthenticationService) {
    this.authService.currentUser.subscribe(loginResponse => {
      this.user = loginResponse.user;
    });
  }

  ngOnInit(): void {

  }

}
