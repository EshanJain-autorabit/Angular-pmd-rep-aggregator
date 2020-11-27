import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AuthenticationService } from './_services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pmd-rep-aggregator-ui';
  isLoggedIn = false;
  constructor(private primengConfig: PrimeNGConfig, private authService: AuthenticationService){ 
  }
  ngOnInit(): void {
    this.primengConfig.ripple = true;
    if(!(this.authService.currentUserValue == null)){
      this.isLoggedIn = true;
    }
  
  
  }
}
