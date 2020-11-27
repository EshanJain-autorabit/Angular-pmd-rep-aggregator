import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }
  items: MenuItem[];

  activeItem: MenuItem;

  ngOnInit() {
      this.items = [
          {label: 'Home', icon: 'pi pi-fw pi-home', routerLink:['/select org']},
          {label: 'User Profile', icon: 'pi pi-fw pi-user', routerLink:['/user profile']},
          {label: 'Logout', icon: 'pi pi-fw pi-power-off', command: (event) =>{this.authService.logout();
          location.reload();} }
      ];

      this.activeItem = this.items[0];
  }

}
