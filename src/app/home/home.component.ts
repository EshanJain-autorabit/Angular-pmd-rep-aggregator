import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loading = true;
  items: MenuItem[];
  user: User;
  constructor(
    private authService: AuthenticationService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.user = this.authService.currentUserValue.user;
    this.loading = false;
    this.items = [
      {
        label: 'Select Org',
        routerLink: 'select org'
      },
      {
        label: 'Select Apex Components',
        routerLink: 'select apex components'
      },
      {
        label: 'Add Reviewer',
        routerLink: 'reviewer'
      },
      {
        label: 'View Report',
        routerLink: 'view report'
      },
    ];
  }

}
