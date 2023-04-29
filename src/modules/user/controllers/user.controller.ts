import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from '../services/user.services';
import { User } from 'src/modules/user/entities/user.entity';
import { UserDto } from '../dtos/user.dto';
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {
    console.log('User Controller Triggered');
  }

  @Get()
  async getUser(): Promise<User[]> {
    const users = await this.userService.getUserData();
    return users;
  }
  @Get(':id')
  async getById(@Param('id') id: number): Promise<User> {
    const user = await this.userService.getDatbyId(id);
    return user;
  }
  @Post()
  async add(@Body() userDto: UserDto): Promise<User> {
    try {
      return this.userService.addUser(userDto);
    } catch (err) {
      console.log(err);
    }
  }
}
