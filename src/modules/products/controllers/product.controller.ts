import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/dto';
import { ProductService } from '../services/product.services';
//import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserGuard } from 'src/guard/auth.guard';
@UseGuards(UserGuard)
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get() //Get All Products
  //@UseGuards(UserGuard) //working protected routes
  async read(): Promise<Product[]> {
    const allProducts = await this.productService.getData();
    return allProducts;
  }
  @Get(':id') // Get Product of Specific id
  async readbyId(
    @Req() req,
    @Param('id') id: number,
  ): Promise<Product | string> {
    console.log(req.user.id);
    return await this.productService.getDatabyId(id);
  }
  @Post() //create product -name,description, brand,price,quality
  add(@Body() productDto: CreateProductDto): Promise<Product> {
    return this.productService.addData(productDto);
  }
  @Post(':id') //increase qunatity of any product by specific id
  quantity(@Param('id') id: number, @Body() body: any): Promise<Product> {
    return this.productService.addQuantity(id, body);
  }
  @Put(':id') //update details of any specific product by id- ?name,?description,?brand,?price ,?quality
  async updation(
    @Param('id') id: number,
    @Body() productDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.updateData(id, productDto);
  }
  @Delete(':id') //delete the product by specific id
  async delete(@Param('id') id: number): Promise<string> {
    return this.productService.deleteData(id);
  }
}
