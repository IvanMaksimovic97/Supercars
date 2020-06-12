import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../brands.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Brand } from '../brand';

@Component({
  selector: 'app-brand-operations',
  templateUrl: './brand-operations.component.html',
  styleUrls: ['./brand-operations.component.css'],
  animations:[
    trigger("showHide", [
      state('true', style({transform: 'scale(1)'})),
      state('false', style({transform: 'scale(0)'})),
      transition('false<=>true', animate('800ms ease'))
    ])
  ]
})
export class BrandOperationsComponent implements OnInit {

  action = 'Insert';
  brands;
  message;
  msgType = 'success';
  updateId;

  insertForm: FormGroup;

  showInsert = false;
  imageInput = false;
  update = false;
  buttonStatus = true;
  isMessageDisplayed = false;

  constructor(private brandsService: BrandsService) { }

  ngOnInit(): void {
    this.getAll();
    this.insertForm = new FormGroup({
      brand: new FormControl("", [Validators.required, Validators.min(1)])
    });
  }

  onSubmit(){
    this.isMessageDisplayed = false;
    if(this.insertForm.status === "VALID"){
      this.insertBrand();
      this.insertForm.reset();
    }
    else{
      this.msgType = 'danger';
      this.message = "Check inputs!";
      this.isMessageDisplayed = true;
    }
  }

  getAll(){
    this.brandsService.getAll().valueChanges().subscribe(brands => {
      this.brands = brands;
    });
  }

  insertBrand(){
    var timestamp = Date.now();

    let brand: Brand = new Brand;
    brand.name = this.insertForm.value.brand;

    if(this.update){
      brand.id = this.updateId;
      this.brandsService.update(brand);
      this.message = "Successful update!";
      this.msgType = "success";
      this.isMessageDisplayed = true;
    }
    else{
      brand.id = timestamp;
      this.brandsService.create(brand);
      this.message = "Successful insert!";
      this.msgType = "success";
      this.isMessageDisplayed = true;
    }
  }

  updateBrand(id){
    this.brandsService.getOne(id).valueChanges().subscribe(brand => {
      this.insertForm = new FormGroup({
        brand: new FormControl(brand.name, Validators.required)
      });
      this.updateId = id;
      this.update = true;
      this.imageInput = true;
      this.buttonStatus = false;
      this.action = "Update";
      this.showInsert = true;
    });
  }

  deleteBrand(id){
    this.brandsService.delete(id);
  }

  changeToInsert(){
    this.showInsert = false;
    this.update = false;
    this.imageInput = false;
    this.buttonStatus = true;
    this.action = "Insert";
    this.insertForm = new FormGroup({
      brand: new FormControl("", [Validators.required, Validators.min(1)])
    });
  }
}
