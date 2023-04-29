import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/dto';
import { ProductService } from '../services/product.services';
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
} from '@nestjs/common';
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get()
  async read(): Promise<Product[]> {
    const allProducts = await this.productService.getData();
    return allProducts;
  }
  @Get(':id')
  async readbyId(@Param('id') id: number): Promise<Product> {
    return await this.productService.getDatabyId(id);
  }
  @Post()
  add(@Body() productDto: CreateProductDto): Promise<Product> {
    return this.productService.addData(productDto);
  }
  @Post(':id')
  quantity(@Param('id') id: number, @Body() body: any): Promise<Product> {
    return this.productService.addQuantity(id, body);
  }
  @Put(':id')
  async updation(
    @Param('id') id: number,
    @Body() productDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.updateData(id, productDto);
  }
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<string> {
    return this.productService.deleteData(id);
  }
}
