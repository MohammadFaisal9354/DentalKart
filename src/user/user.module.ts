import { Module } from '@nestjs/common';
import { UserController } from 'src/user/controllers/user.controller';
import { UserService } from 'src/user/services/user.services';
@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
