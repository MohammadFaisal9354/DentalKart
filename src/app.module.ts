import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { apiControllers } from './api.controllers';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { ProductService } from './products/services/product.services';
import { ProductController } from './products/controllers/product.controller';
import { APP_FILTER } from '@nestjs/core';
import { ErrorFilter } from './filters/error.filter';
import { DatabaseModule } from './Databases/database.module';
import { cartModule } from './cart/cart.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
@Module({
  imports: [
    DatabaseModule,
    ProductsModule,
    cartModule,
    UserModule,
    OrderModule,
    // SequelizeModule.forRoot({
    //   dialect: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: '',
    //   database: 'test',
    //   autoLoadModels: true,
    //   synchronize: true,
    // }),
    // SequelizeModule.forFeature([Product]),
  ],
  controllers: [apiControllers],
  providers: [
    // {
    // provide: APP_FILTER,
    // useClass: ErrorFilter,
    // },
  ],
})
export class AppModule {}
