import { Module } from "@nestjs/common";
import { productsController } from "./products.controller";
import { productService } from "./products.service";
@Module({
    controllers:[productsController],
    providers:[productService],
})
export class ProductsModule{

}