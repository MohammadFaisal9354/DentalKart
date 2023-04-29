import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from '../services/order.services';
import { Order } from '../entities/order.entity';
import { CreateOrderDto } from '../dtos/order.dto';
import { UserGuard } from 'src/guard/auth.guard';
@UseGuards(UserGuard)
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async placeOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.placeOrder(createOrderDto);
  }
  @Get('cart/:id')
  async placeOrderbyCart(@Param('id') id: number): Promise<any> {
    return this.orderService.placeOrderbyCart(id);
  }

  @Get(':id')
  async getOrderById(@Param('id') id: number): Promise<Order> {
    return this.orderService.getOrderById(id);
  }
}
