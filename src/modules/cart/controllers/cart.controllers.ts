import { Controller, Get, Post, Delete, Body, UseGuards } from '@nestjs/common';
import { Product } from 'src/modules/products/entities/product.entity';
import { ShoppingCart } from '../entities/cart.entity';
import { CartService } from 'src/modules/cart/services/cart.services';
import { UserGuard } from 'src/guard/auth.guard';
// import { InjectModel } from '@nestjs/sequelize';
// import { Product } from 'src/products/product.model';
// import { ShoppingCart } from './shopping-cart.model';
@UseGuards(UserGuard)
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
