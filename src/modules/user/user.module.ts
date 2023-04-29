import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.services';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
