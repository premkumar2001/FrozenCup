import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../model/cart.model';
import { Product } from '../model/product.model';
import { ProductUserService } from '../service/productuser.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products:Product[];
  product:Product;
  cart:Cart={cartItemID: 0,userId:0,productName:'',productPrice:0,productQuantity:0,productImageUrl:''};
  constructor(private service:ProductUserService,private router:Router) { }

  ngOnInit(): void {
    //to get data from backend

    // this.service.getAllProduct().subscribe({
    //   next:data=>{
    //   this.products=data;
    // },error:err=>{
    //   console.log(err);
    // }})
    
    this.products=this.service.getProducts();
  }

  onCart(id:number){
    this.product=this.service.getProduct(id);
    this.cart.cartItemID=0;
    this.cart.userId=this.product.productId;
    this.cart.productName=this.product.productName;
    this.cart.productPrice=this.product.productPrice;
    this.cart.productQuantity=this.product.productQuantity;
    this.cart.productImageUrl=this.product.productImageUrl;
    this.service.saveCart(this.cart);
    this.router.navigate(['/cart']);
  }
}
