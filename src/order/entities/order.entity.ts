import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany,
  PrimaryKey,
  AutoIncrement,
  Default,
} from 'sequelize-typescript';
import { DataType } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/user/entities/user.entity';
import { OrderItem } from './Order-item.entity';

@Table
export class Order extends Model<Order> {
  @PrimaryKey
  @Default(uuidv4) // import { v4 as uuidv4 } from 'uuid';
  // @Column(DataType.UUID)
  @Column
  id: string;

  @ForeignKey(() => User)
  @Column
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => OrderItem)
  items: OrderItem[];

  @Column
  total_cost: number;

  @Column
  payment_details: string;
}
