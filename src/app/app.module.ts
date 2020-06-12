import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { environment } from 'src/environments/environment';
import { CarOperationsComponent } from './car-operations/car-operations.component';
import {
  AngularFireStorageModule,
  AngularFireStorageReference,
  AngularFireUploadTask,
  StorageBucket,
  AngularFireStorage
} from "@angular/fire/storage";
import { MultiplyPipe } from './multiply.pipe';
import { SplitPipe } from './split.pipe';
import { KmWithDotsPipe } from './km-with-dots.pipe';
import { BrandOperationsComponent } from './brand-operations/brand-operations.component';
import { HeaderModule } from './header/header.module';
import { AppRoutingModule } from './app-routing/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    ContactComponent,
    CarDetailsComponent,
    CarOperationsComponent,
    MultiplyPipe,
    SplitPipe,
    KmWithDotsPipe,
    BrandOperationsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    HeaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
