import { Module } from '@nestjs/common';
import { apiControllers } from './api.controllers';
import { APP_FILTER } from '@nestjs/core';
import { ErrorFilter } from './filters/error.filter';
import { DatabaseModule } from './Databases/database.module';
import { cartModule } from './modules/cart/cart.module';
import { UserModule } from './modules/user/user.module';
import { OrderModule } from './modules/order/order.module';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    ProductsModule,
    cartModule,
    UserModule,
    OrderModule,
    AuthModule,
    // PassportModule.register({ defaultStrategy: 'jwt' }),
    // JwtModule.register({
    //   secret: 'your_secret_key_here',
    //   signOptions: { expiresIn: '1d' },
    // }),
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
    //JwtStrategy,
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
  ],
})
export class AppModule {}
