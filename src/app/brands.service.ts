import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from 'angularfire2/database';
import { Brand } from './brand';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  private path: string = '/brands';

  private brandsRef: AngularFireList<Brand> = null;
  private brandObj: AngularFireObject<Brand> = null;
  private db: AngularFireDatabase;

  constructor(db: AngularFireDatabase) { 
    this.db = db;
    this.brandsRef = this.db.list(this.path);
  }

  getAll(){
    return this.brandsRef;
  }

  getOne(id:number){
    this.brandObj = this.db.object(this.path+'/'+id);
    return this.brandObj;
  }

  create(brand: Brand){
    this.db.object(this.path+'/'+brand.id).set(brand);
  }

  update(brand: Brand){
    this.db.object(this.path+'/'+brand.id).update(brand);
  }

  delete(id:number){
    this.db.object(this.path+'/'+id).remove();
  }
}
