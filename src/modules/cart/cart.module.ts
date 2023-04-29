import { Module } from '@nestjs/common';
import { ShoppingCartController } from './controllers/cart.controllers';
import { CartService } from './services/cart.services';
@Module({
  controllers: [ShoppingCartController],
  providers: [CartService],
})
export class cartModule {}
