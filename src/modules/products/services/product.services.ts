import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
//import { InjectModel } from '@nestjs/sequelize';
import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/dto';
import { NotFoundException } from '@nestjs/common';
import { validate } from 'class-validator';
@Injectable()
export class ProductService {
  constructor() {} //private productModel: typeof Product, //@InjectModel(Product)
  async getData(): Promise<Product[]> {
    const products = await Product.findAll();
    return products;
  }
  async getDatabyId(id: number): Promise<Product | string> {
    const dataReceived = await Product.findByPk(id);
    //console.log(dataReceived);
    if (dataReceived === null) {
      // throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
      //throw new Error('Product not found');
      //console.log('data mil gaya');
      return 'Product Not Found ';
      //throw new NotFoundException('error');
    } else {
      //console.log('data nahin mila');
      return dataReceived;
    }
  }
  async addData(productDto: CreateProductDto): Promise<Product> {
    const { name, description, brand, price, quantity } = productDto;
    if (!name || !description || !brand || !price || !quantity) {
      throw new BadRequestException('Validation failed');
    }
    return await Product.create({
      name,
      description,
      brand,
      price,
      quantity,
    });

    //return Product.create(productDto);
  }
  async addQuantity(id, body: any): Promise<Product> {
    // return Product.create(productDto);
    const product = await Product.findByPk(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    const newQuantity = Number(body.quantity) + Number(product.quantity);
    await product.update({ quantity: newQuantity });
    //console.log(newQuanatity);
    //newQuanatity.update(body.quantity);

    return product;
  }
  async updateData(id: number, productDto: UpdateProductDto): Promise<Product> {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    const { name, description, brand, price, quantity } = productDto;
    if (!name && !description && !brand && !price && !quantity) {
      throw new BadRequestException('At least one field must be provided');
    }

    return await product.update(productDto);
  }
  async deleteData(id: number): Promise<string> {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    await product.destroy();
    return 'Deleted Successfully';
  }
}
