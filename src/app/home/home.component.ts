import { Component, OnInit } from '@angular/core';
import { CarsService } from '../cars.service';
import { BrandsService } from '../brands.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cars:any;
  brands:any;
  selectedOption = '';
  sortOption = 0;
  slc = false;

  toHp = 1.3596216173039;
  constructor(private carsService: CarsService, private brandsService: BrandsService) { }

  ngOnInit(): void {
    this.getAll();
    this.getBrands();
    this.slc = true;
  }

  getAll(){
    this.carsService.getAll().valueChanges().subscribe(cars => {
      this.cars = cars;
    });
  }

  getBrands(){
    this.brandsService.getAll().valueChanges().subscribe(brands => {
      this.brands = brands;
    });
  }

  sortByAndFilter(){
    if(this.sortOption == 1){
      this.carsService.getAll().valueChanges().subscribe(cars => {
        let tmpCars = cars.sort((car1, car2) => {
          if (car1.price > car2.price) {
            return -1;
          }
          if (car1.price < car2.price) {
            return 1;
          }
          return 0;
        });
        if(this.selectedOption != ''){
          tmpCars = tmpCars.filter(car => car.brand == this.selectedOption);
        }
        this.cars = tmpCars;
      });
    }
    if(this.sortOption == 2){
      this.carsService.getAll().valueChanges().subscribe(cars => {
        let tmpCars = cars.sort((car1, car2) => {
          if (car1.price > car2.price) {
            return 1;
          }
          if (car1.price < car2.price) {
            return -1;
          }
          return 0;
        });
        if(this.selectedOption != ''){
          tmpCars = tmpCars.filter(car => car.brand == this.selectedOption);
        }
        this.cars = tmpCars;
      });
    }
    if(this.sortOption == 0){
      if(this.selectedOption != ''){
        this.carsService.getAll().valueChanges().subscribe(cars => {
          this.cars = cars.filter(car => car.brand == this.selectedOption);
        });
      }
      else{
        this.getAll();
      }
    }
  }
}
