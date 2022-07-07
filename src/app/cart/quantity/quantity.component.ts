import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Cart } from 'src/app/model/cart.model';
import { Product } from 'src/app/model/product.model';
import { ProductUserService } from 'src/app/service/productuser.service';

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.css']
})
export class QuantityComponent implements OnInit {

  cart:Cart;
  product:Product;
  quantity:number=0;
  avail:number=0;
  total:number;
  constructor(private activatedRoute:ActivatedRoute,private service:ProductUserService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params:Params)=>{
      let id=+params['id'];
      this.cart=this.service.getCart(id);
      this.avail=this.service.getQuantity(this.cart.cartItemID);
      if(this.avail==null)
        this.avail=0;
      console.log(this.avail);
      this.total=this.service.getTotal();
    });
  }

  onSubmit(name:string){
    if(this.quantity>=0){
      this.product=this.service.getProductByName(name);
      //order to be updated
      if(this.avail>this.quantity){
        this.product.productQuantity=this.product.productQuantity+(this.avail-this.quantity);
        this.cart.productQuantity=this.cart.productQuantity+(this.avail-this.quantity);
      }
      else if(this.avail<this.quantity){
        this.product.productQuantity=this.product.productQuantity-this.quantity;
        this.cart.productQuantity=this.cart.productQuantity-this.quantity;
      }
      this.service.updateCart(this.cart.cartItemID,this.cart);//Cart to be Updated
      this.service.saveProduct(this.product.productId,this.product);//Product to be updated
      this.service.setQuantity(this.cart.cartItemID,this.quantity);//Selected Quantity updated
      this.avail=this.quantity;
      //this.quantity=0;
      this.total=this.service.getTotal();
    }
  }

}
