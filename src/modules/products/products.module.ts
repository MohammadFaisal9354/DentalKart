import { Module } from "@nestjs/common";
import { ProductController } from "./controllers/product.controller";
import { ProductService } from "./services/product.services";
@Module({
    controllers:[ProductController],
    providers:[ProductService],
})
export class ProductsModule{

}