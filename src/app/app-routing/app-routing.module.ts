import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ContactComponent } from '../contact/contact.component';
import { CarDetailsComponent } from '../car-details/car-details.component';
import { CarOperationsComponent } from '../car-operations/car-operations.component';
import { BrandOperationsComponent } from '../brand-operations/brand-operations.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "contact",
    component: ContactComponent
  },
  {
    path: "car/:id",
    component: CarDetailsComponent
  },
  {
    path: "car_operations",
    component: CarOperationsComponent
  },
  {
    path: "brand_operations",
    component: BrandOperationsComponent
  },
  {
    path : "**",
    redirectTo : ""
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
