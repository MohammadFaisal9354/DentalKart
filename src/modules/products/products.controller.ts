import { Controller,Post,Body, Get } from "@nestjs/common";
import {productService} from "./products.service";
@Controller('products')
export class productsController{
    constructor(private readonly productServices:productService){

    }
    @Post()
    addProduct(
        @Body('name') productName:string,
        @Body('description') descrption:string,
        @Body('price') pric:number,
        @Body('quantity') quanty:number ):any{
        const pId=this.productServices.addProduct(productName,descrption,pric,quanty);
        return {id:pId};
    }
    @Get()
    getProduct():any{
        this.productServices.getProducts();
    }

} 