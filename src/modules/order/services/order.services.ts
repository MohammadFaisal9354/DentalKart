import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/Order-item.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { CreateOrderDto } from '../dtos/order.dto';

@Injectable()
export class OrderService {
  //constructor(
  //     @InjectModel(Order)
  //     private readonly orderModel: typeof Order,
  //     @InjectModel(OrderItem)
  //     private readonly orderItemModel: typeof OrderItem,
  //     @InjectModel(Product)
  //     private readonly productModel: typeof Product,
  //   ) {}

  async placeOrder(req: CreateOrderDto): Promise<Order> {
    const { userId, productId, quantity, payment_details } = req;

    if (!userId || !productId || !quantity || !payment_details) {
      throw new HttpException(
        'All fields are required',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    try {
      const product = await Product.findByPk(productId);
      //   const x = (product as any).price.replace(/\$/g, '');
      const x = product.price;
      const total_cost = x * quantity;

      const order = await Order.create({
        userId,
        total_cost,
        payment_details,
      });
      await OrderItem.create({
        orderId: order.id,
        productId,
        quantity,
      });
      return order;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async getOrderById(id: number): Promise<Order> {
    const item = await Order.findByPk(id, {
      include: [{ model: OrderItem, include: [Product] }],
    });
    if (!item) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    try {
      return item;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
