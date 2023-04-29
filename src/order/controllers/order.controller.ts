import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OrderService } from '../services/order.services';
import { Order } from '../entities/order.entity';
import { CreateOrderDto } from '../dtos/order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async placeOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.placeOrder(createOrderDto);
  }

  @Get(':id')
  async getOrderById(@Param('id') id: number): Promise<Order> {
    return this.orderService.getOrderById(id);
  }
}
