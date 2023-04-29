import { Module } from '@nestjs/common';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.services';
// import { order } from './controllers/product.controller';
// import { ProductService } from './services/product.services';
@Module({
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
