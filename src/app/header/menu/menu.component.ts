import { Component, OnInit } from '@angular/core';
import { NavmenuService } from 'src/app/navmenu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  navmenu;
  constructor(private menuService: NavmenuService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.menuService.getAll().valueChanges().subscribe(menu => {
      this.navmenu = menu;
    })
  }
}
