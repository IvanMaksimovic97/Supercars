import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from 'angularfire2/database';
import { NavMenu } from './navmenu';

@Injectable({
  providedIn: 'root'
})
export class NavmenuService {

  private path: string = '/menu';

  private menuRef: AngularFireList<NavMenu> = null;
  private menudObj: AngularFireObject<NavMenu> = null;
  private db: AngularFireDatabase;
  
  constructor(db: AngularFireDatabase) { 
    this.db = db;
    this.menuRef = this.db.list(this.path);
  }

  getAll(){
    return this.menuRef;
  }
}
