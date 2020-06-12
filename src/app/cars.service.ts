import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Car } from './car';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  private path: string = '/cars';

  private carsRef: AngularFireList<Car> = null;
  private carObj: AngularFireObject<Car> = null;
  private db: AngularFireDatabase;

  constructor(db: AngularFireDatabase, private http: HttpClient) {
    this.db = db;
    this.carsRef = this.db.list(this.path);
  }

  getAll(): AngularFireList<Car> {
    return this.carsRef;
  }

  getOne(id:number): AngularFireObject<Car> {
    this.carObj = this.db.object(this.path+'/'+id);
    return this.carObj;
  }

  create(car: Car): void {
    this.db.object(this.path+'/'+car.id).set(car);
  }

  update(car: Car){
    this.db.object(this.path+'/'+car.id).update(car);
  }

  delete(id:number){
    this.db.object(this.path+'/'+id).remove();
  }
}
