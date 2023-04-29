import { Module } from '@nestjs/common';
import { apiControllers } from './api.controllers';
import { ProductsModule } from './products/products.module';
@Module({
  imports: [ProductsModule,
    
  ],
  controllers: [apiControllers],
  providers: [],
})
export class AppModule {}
