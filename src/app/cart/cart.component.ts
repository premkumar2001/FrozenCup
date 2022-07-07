import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../model/cart.model';
import { ProductUserService } from '../service/productuser.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  len:number=0;
  quantity:number;
  total:number;
  carts:Cart[];
  constructor(private service:ProductUserService,private router:Router) { }

  ngOnInit(): void {
    this.carts=this.service.getCartDetails();
    this.len=this.carts.length;
    this.total=this.service.getTotal();
  }

  onShop(){
    this.router.navigate(['/']);
  }

  onMore(){
    this.router.navigate(['/']);
  }
  // onSubmit(name:string){
  //   if(this.quantity>0){
  //     let product=this.service.getProductByName(name);
  //     product.productQuantity=product.productQuantity-this.quantity;
  //     //order to be updated
  //     this.total=this.total+(product.productPrice*this.quantity);
  //   }
  // }
}
