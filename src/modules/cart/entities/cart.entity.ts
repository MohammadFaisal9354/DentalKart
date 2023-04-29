import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Product } from 'src/modules/products/entities/product.entity';
@Table({ tableName: 'cart' })
export class ShoppingCart extends Model<ShoppingCart> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => Product)
  @Column({ allowNull: false })
  productId: number;

  @Column({ allowNull: false })
  userId: string;

  @BelongsTo(() => Product)
  product: Product;

  @Column({ allowNull: false })
  quantity: number;
}
