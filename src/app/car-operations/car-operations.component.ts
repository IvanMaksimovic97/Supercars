import { Component, OnInit } from '@angular/core';
import { CarsService } from '../cars.service';
import { BrandsService } from '../brands.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from "@angular/fire/storage";
import { Car } from '../car';
import { Observable } from 'rxjs';
import { map, finalize } from "rxjs/operators";
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-car-operations',
  templateUrl: './car-operations.component.html',
  styleUrls: ['./car-operations.component.css'],
  animations:[
    trigger("showHide", [
      state('true', style({transform: 'scale(1)'})),
      state('false', style({transform: 'scale(0)'})),
      transition('false<=>true', animate('800ms ease'))
    ])
  ]
})
export class CarOperationsComponent implements OnInit {

  mainUrl;
  downloadURL: Observable<string>;
  insertForm: FormGroup;
  action = 'Insert';
  cars;
  brands;

  selectedImage = false;
  selected = false;
  buttonStatus = true;
  imageError = false;
  imageInput = false;
  update = false;
  updateId;
  message;
  isMessageDisplayed = false;
  showInsert = false;
  msgType = 'success';
  condition = true;

  toHp = 1.3596216173039;
  constructor(private carsService: CarsService, private brandsService: BrandsService, private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.getAllCars();
    this.getAllBrands();
    this.selected = true;

    this.insertForm = new FormGroup({
      brand: new FormControl("", [Validators.required, Validators.min(1)]),
      model: new FormControl("", Validators.required),
      mileage: new FormControl("", [Validators.required, Validators.pattern('^[0-9]{1,6}$')]),
      power: new FormControl("", [Validators.required, Validators.pattern('^[0-9]{1,4}$')]),
      price: new FormControl("", [Validators.required, Validators.pattern('^[0-9]{1,7}$')]),
      status: new FormControl("", [Validators.required]),
      year: new FormControl("", [Validators.required, Validators.pattern('^[0-9]{4}$')])
    });
  }

  onSubmit(){
    this.isMessageDisplayed = false;
    if(this.insertForm.status === "VALID"){
      this.insertCar();
      this.insertForm.reset({brand: "", status: "0"});
    }
    else{
      this.msgType = 'danger';
      this.message = "Check inputs!";
      this.isMessageDisplayed = true;
    }
  }

  getAllCars(){
    this.carsService.getAll().valueChanges().subscribe(cars => {
      this.cars = cars;
    });
  }

  getAllBrands(){
    this.brandsService.getAll().valueChanges().subscribe(brands => {
      this.brands = brands;
    })
  }

  insertCar(){
    var timestamp = Date.now();

    let car: Car = new Car;
    car.brand = this.insertForm.value.brand;
    car.model = this.insertForm.value.model;
    car.mileage = parseInt(this.insertForm.value.mileage);
    car.powerkw = parseInt(this.insertForm.value.power);
    car.price = parseInt(this.insertForm.value.price);
    car.status = this.insertForm.value.status;
    car.year = parseInt(this.insertForm.value.year);
    
    //this.carsService.create(car);

    if(this.update){
      car.id = this.updateId;
      this.carsService.update(car);
      this.message = "Successful update!";
      this.msgType = "success";
      this.isMessageDisplayed = true;
    }
    else{
    //image upload
    const file = this.selectedImage;
    const filePath = 'cars/'+timestamp;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.downloadURL = fileRef.getDownloadURL();
            this.downloadURL.subscribe(url => {
              if (url) {
                //dodvanje putanje slike
                car.id = timestamp;
                car.imgname = url;
                //insert u bazu (mora ovde inace se gube podaci)
                this.carsService.create(car);
                this.message = "Successful insert!";
                this.msgType = "success";
                this.isMessageDisplayed = true;
              }
        
            });
          })
        )
        .subscribe(url => {
          if (url) {
            //console.log(url);
          }
        });
      }
  }

  deleteCar(id){
    this.carsService.getOne(id).valueChanges().subscribe(car => {
      this.storage.ref('cars/'+car.id).delete();
      this.carsService.delete(id);
    });
  }

  updateCar(id){
    this.carsService.getOne(id).valueChanges().subscribe(car => {
      this.insertForm = new FormGroup({
        brand: new FormControl(car.brand, [Validators.required, Validators.min(1)]),
        model: new FormControl(car.model, Validators.required),
        mileage: new FormControl(car.mileage, [Validators.required, Validators.pattern('^[0-9]{1,6}$')]),
        power: new FormControl(car.powerkw, [Validators.required, Validators.pattern('^[0-9]{1,4}$')]),
        price: new FormControl(car.price, [Validators.required, Validators.pattern('^[0-9]{1,7}$')]),
        status: new FormControl(car.status, [Validators.required]),
        year: new FormControl(car.year, [Validators.required, Validators.pattern('^[0-9]{4}$')])
      });
      this.updateId = id;
      this.update = true;
      this.imageInput = true;
      this.buttonStatus = false;
      this.action = "Update";
      this.showInsert = true;
    });
  }

  uploadImage(event){
    if(event.target.files[0].type === 'image/png' || event.target.files[0].type === 'image/jpeg' || event.target.files[0].type === 'image/jpg'){
      this.selectedImage = event.target.files[0];
      this.buttonStatus = false;
      this.imageError = false;
    }
    else{
      this.imageError = true;
    }
  }

  changeToInsert(){
    this.showInsert = false;
    this.update = false;
    this.imageInput = false;
    this.buttonStatus = true;
    this.action = "Insert";
    this.insertForm = new FormGroup({
      brand: new FormControl("", [Validators.required, Validators.min(1)]),
      model: new FormControl("", Validators.required),
      mileage: new FormControl("", [Validators.required, Validators.pattern('^[0-9]{1,6}$')]),
      power: new FormControl("", [Validators.required, Validators.pattern('^[0-9]{1,4}$')]),
      price: new FormControl("", [Validators.required, Validators.pattern('^[0-9]{1,7}$')]),
      status: new FormControl("", [Validators.required]),
      year: new FormControl("", [Validators.required, Validators.pattern('^[0-9]{4}$')])
    });
  }
}
