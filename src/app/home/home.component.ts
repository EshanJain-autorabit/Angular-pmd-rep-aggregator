import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading = true;
  user: User;
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.user = this.authService.currentUserValue.user;
    this.loading = false ;
}

}
