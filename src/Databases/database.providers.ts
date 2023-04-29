import { Sequelize } from 'sequelize-typescript';
import { Product } from 'src/modules/products/entities/product.entity';
import { ShoppingCart } from 'src/modules/cart/entities/cart.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Order } from 'src/modules/order/entities/order.entity';
import { OrderItem } from 'src/modules/order/entities/Order-item.entity';
export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'test',
      });
      sequelize.addModels([Product, ShoppingCart, User, Order, OrderItem]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
