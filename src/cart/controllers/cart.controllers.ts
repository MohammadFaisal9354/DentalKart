import { Controller, Get, Post, Delete, Body } from '@nestjs/common';
import { Product } from 'src/products/entities/product.entity';
import { ShoppingCart } from '../entities/cart.entity';
import { CartService } from 'src/cart/services/cart.services';
// import { InjectModel } from '@nestjs/sequelize';
// import { Product } from 'src/products/product.model';
// import { ShoppingCart } from './shopping-cart.model';

@Controller()
export class ShoppingCartController {
  //constructor() {} //private readonly shoppingCartModel: typeof ShoppingCart, //@InjectModel(ShoppingCart) //private readonly productModel: typeof Product, //@InjectModel(Product)
  constructor(private cartService: CartService) {}
  @Post('cart')
  addProductToCart(@Body() body: any) {
    return this.cartService.addCart(body);
  }

  @Get('cart')
  viewCartProduct(@Body() body: any) {
    return this.cartService.viewCart(body);
  }

  @Delete('cart')
  deleteProductFromCart(
    @Body('userId') userId: string,
    @Body('productId') productId: string,
  ) {
    return this.cartService.removeProductFromCart(userId, productId);
  }

  @Post('placeOrder')
  orderPlace(@Body() body: any) {
    return this.cartService.placeOrder();
  }

  @Get('receipt')
  receiptGeneration(@Body() body: any) {
    return this.cartService.generateReceipt();
  }
}
