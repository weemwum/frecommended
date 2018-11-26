import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { InventoryService } from './services/inventory.service';
import { ProductAPIService } from './services/product-api.service';
import { AnimationsComponent } from './animations/animations.component'

@NgModule({
  declarations: [
    AppComponent,
    AnimationsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [InventoryService,  ProductAPIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
