import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  constructor() { }
  items: MenuItem[];
    
  home: MenuItem;
  
  ngOnInit() {
      this.items = [
          {label: 'Org Selection'},
          {label: 'Apex Class Selection'},
          {label: 'PMD Rule Selection'},
          {label: 'SCA Report'}
      ];
      
      this.home = {icon: 'pi pi-home'};
    }  

}
