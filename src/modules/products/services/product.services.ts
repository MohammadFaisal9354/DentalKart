import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/dto';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class ProductService {
  constructor() {} //private productModel: typeof Product, //@InjectModel(Product)
  async getData(): Promise<Product[]> {
    const products = await Product.findAll();
    return products;
  }
  async getDatabyId(id: number): Promise<Product> {
    const dataReceived = Product.findByPk(id);
    if (dataReceived === null) {
      {
        // throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
        throw new Error('Product not found');
      }
    } else {
      return dataReceived;
    }
  }
  async addData(productDto: CreateProductDto): Promise<Product> {
    return Product.create(productDto);
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
    return product.update(productDto);
  }
  async deleteData(id: number): Promise<string> {
    const product = await Product.findByPk(id);
    await product.destroy();
    return 'Deleted Successfully';
  }
}
