import { Injectable } from "@nestjs/common";
import {Product} from './product.model';
@Injectable()
export class productService{
    products:Product[]=[];
    addProduct( name:string,  description:string ,  price:number,  quantity:number){
        const productId=new Date().toString();
        const newProduct=new Product(productId,name,description,price,quantity)
        this.products.push(newProduct);
        return productId;
    }
    getProducts(){
        return [...this.products];
    }
}