import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClient,HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserheaderComponent } from './userheader/userheader.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductUserService } from './service/productuser.service';
import { FormsModule } from '@angular/forms';
import { QuantityComponent } from './cart/quantity/quantity.component';

const routes:Routes=[
  {path:'',component:HomeComponent},
  {path:'cart',component:CartComponent,children:[
    {path:':id',component:QuantityComponent}
  ]}
];
@NgModule({
  declarations: [
    AppComponent,
    UserheaderComponent,
    HomeComponent,
    CartComponent,
    QuantityComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule
  ],
  providers: [ProductUserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
