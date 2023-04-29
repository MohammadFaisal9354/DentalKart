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
import { ShoppingCart } from 'src/modules/cart/entities/cart.entity';
import { User } from 'src/modules/user/entities/user.entity';

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

    // Check if all fields are present
    if (!userId || !productId || !quantity || !payment_details) {
      throw new HttpException(
        'All fields are required',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    // Check if all products exist
    for (const prodId of productId) {
      const product = await Product.findByPk(prodId);
      if (!product) {
        throw new HttpException(
          `Product with ID ${prodId} not found`,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    let total_cost = 0;
    let order = await Order.create({
      userId,
      total_cost,
      payment_details,
    });

    for (const prodId of productId) {
      const product = await Product.findByPk(prodId);

      const price = product.price;
      const cost = price * quantity;
      total_cost += cost;

      // Create order for each product

      await OrderItem.create({
        orderId: order.id,
        productId: prodId,
        quantity,
      });
    }

    // Update the order with total cost
    order.total_cost = total_cost;
    await order.save();

    return order;
  }
  async placeOrderbyCart(id: number): Promise<any> {
    let username = await User.findByPk(id, {
      attributes: ['first_name', 'last_name'],
    });
    const name = username.first_name + ' ' + username.last_name;
    const cartitems = await ShoppingCart.findAll({
      attributes: ['productId', 'quantity'],
      where: {
        userId: id,
      },
    });

    const productids = cartitems.map((product) => product.productId);
    const productquantity = cartitems.map((product) => product.quantity);
    const prices = await Product.findAll({
      attributes: ['price'],
      where: { id: productids },
    });

    let totalCost = 0;

    for (let i = 0; i < productquantity.length; i++) {
      const price: any = prices[i].get('price');
      const quantity = productquantity[i];
      const itemCost = price * quantity;
      totalCost += itemCost;
    }
    return name;
    //return products;
  }
  async getOrderById(id: number): Promise<Order> {
    const item = await Order.findByPk(id, {
      attributes: ['id', 'total_cost'],
      include: [
        {
          model: OrderItem,
          attributes: ['productId', 'quantity'],
          include: [
            {
              model: Product,
              attributes: ['name', 'price'],
            },
          ],
        },
      ],
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
