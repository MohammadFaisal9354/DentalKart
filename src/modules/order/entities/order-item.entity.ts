import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  AutoIncrement,
  HasOne,
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

  @BelongsTo(() => Product) //one to one one 1productid ke 1 product
  product: Product;

  // @HasOne(()=>)
  @Column
  quantity: number;
}
