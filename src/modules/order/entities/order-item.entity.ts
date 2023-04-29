import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { Order } from './order.entity';
import { Product } from 'src/modules/products/entities/product.entity';

@Table
export class OrderItem extends Model<OrderItem> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Order)
  @Column
  orderId: string;

  //   @BelongsTo(() => Order)
  //   order: Order;

  @ForeignKey(() => Product)
  @Column
  productId: number;

  @BelongsTo(() => Product)
  product: Product;

  @Column
  quantity: number;
}
