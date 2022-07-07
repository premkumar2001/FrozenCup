import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Cart } from "../model/cart.model";
import { Product } from "../model/product.model";

@Injectable({
    providedIn:"root"
})
export class ProductUserService{
    constructor(private http:HttpClient){}
    products:Product[]=[
        {productId:1,productName:"vannila",productPrice:150,productDescription:"mild flavour",productImageUrl:"https://media.istockphoto.com/photos/bowl-with-vanilla-ice-cream-balls-picture-id1326143969?b=1&k=20&m=1326143969&s=170667a&w=0&h=VODqqkms3BaKTDeYc7Do6hk3v_VJC4xR2d47RoI3syw=",productQuantity:20},
        {productId:2,productName:"chocolate",productPrice:200,productDescription:"thick flavour",productImageUrl:"https://media.istockphoto.com/photos/belgian-chocolate-ice-creams-picture-id936155834?b=1&k=20&m=936155834&s=170667a&w=0&h=v-WmE-nEiVup8nthJv22ZG4q-wJkqEKsDTPpwWjYMWo=",productQuantity:25},
        {productId:3,productName:"butter scotch",productPrice:250,productDescription:"sweet flavour",productImageUrl:"https://media.istockphoto.com/photos/salted-caramel-ice-creams-on-blue-plate-picture-id800853362?b=1&k=20&m=800853362&s=170667a&w=0&h=nIiKzRwul-s0bMZE-T9aP84OLMkbQoz93v3-JGXXsMg=",productQuantity:30},
        {productId:4,productName:"cotton candy",productPrice:100,productDescription:"candy flavour",productImageUrl:"https://media.istockphoto.com/photos/cotton-candy-ice-cream-sunda-picture-id1136629915?b=1&k=20&m=1136629915&s=170667a&w=0&h=CtIXV6gPhedb-lhEl8oTglYvyPdWHPBOzFOKlBkzvYg=",productQuantity:35}
    ];

    getAllProduct():Observable<Product[]>{
        return this.http.get<Product[]>("http://localhost:8080/products");//To get products from backend
    }

    getProducts():Product[]{
        return this.products;
    }

    getProduct(id:number):Product{
        //console.log(id);
        return this.products.find(product=>product.productId===id);
    }

    getProductByName(name:string):Product{
        return this.products.find(product=>product.productName===name);
    }

    saveProduct(id:number,product:Product){
        let ind=this.products.findIndex(pro=>pro.productId===id);
        this.products[ind]=product;
    }

    carts:Cart[]=[];

    getCartDetails(){
        return this.carts;
    }

    saveCart(cart:Cart){
        if(!this.carts.find(cartel=>cartel.productName===cart.productName)){
            let len=(this.carts.length);
            cart.cartItemID=len+1;
            this.carts[len]=cart;
        }
    }

    getCart(id:number):Cart{
        return this.carts.find(cart=>cart.cartItemID===id);
    }

    updateCart(id:number,cart:Cart){
        let ind=this.carts.findIndex(cart=>cart.cartItemID===id);
        this.carts[ind]=cart;
    }

    total:number=0;
    quan:number[]=[];

    setTotal(tot:number){
        this.total=this.total+tot;
    }

    getTotal(){
        this.total=0;
        for(var i=0;i<this.quan.length;i++){
            if(this.quan[i]>0){
                let cart=this.getCart(i);
                this.total=this.total+(this.quan[i]*cart.productPrice);
            }
        }
        return this.total;
    }

    setQuantity(id:number,qu:number){
        let cart=this.getCart(id);
        if(this.quan[cart.cartItemID]==null)
            this.quan[cart.cartItemID]=0;
        this.quan[cart.cartItemID]=qu;
    }

    getQuantity(id:number){
        let cart=this.getCart(id);
        return this.quan[cart.cartItemID];        
    }
}