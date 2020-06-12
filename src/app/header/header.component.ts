import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  condition = false;
  constructor() { }

  ngOnInit(): void {
  }

  openMenu(){
    this.condition = true;
  }

  close(){
    this.condition = false;
  }
}
