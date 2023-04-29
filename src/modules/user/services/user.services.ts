import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/modules/user/entities/user.entity';
import { UserDto } from '../dtos/user.dto';
import { v4 as uniqueId } from 'uuid';
@Injectable()
export class UserService {
  //   constructor(
  //     @InjectModel(User)
  //     private userModel: typeof User,
  //   ) {
  //     console.log('User Service Triggered');
  //   }

  async getUserData(): Promise<User[]> {
    try {
      const users = await User.findAll();
      return users;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
  async getDatbyId(id: number): Promise<User> {
    const user = await User.findByPk(id);
    if (!user) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    try {
      return user;
    } catch (err) {
      console.log(err);
    }
  }
  async addUser(userDto: UserDto): Promise<User> {
    const newUser = {
      id: uniqueId(),
      first_name: userDto.first_name,
      last_name: userDto.last_name,
      email: userDto.email,
      address: userDto.address,
      mobile: userDto.mobile,
    };
    return User.create(newUser);
  }
}
