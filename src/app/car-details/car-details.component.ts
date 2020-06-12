import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';
import { CarsService } from '../cars.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  id:number;
  car:any;

  toHp = 1.3596216173039;
  constructor(private carsService: CarsService, route: ActivatedRoute) {
    this.id = parseInt(route.snapshot.params["id"]);
  }

  ngOnInit(): void {
    this.getOne(this.id);
  }

  getOne(id:number){
    this.carsService.getOne(id).valueChanges().subscribe(car => {
      this.car = car;
    });
  }
}
