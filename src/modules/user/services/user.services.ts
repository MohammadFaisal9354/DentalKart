import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
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
    return user;
  }
  async addUser(userDto: UserDto): Promise<User> {
    const { first_name, last_name, email, password, address, mobile } = userDto;
    if (
      !first_name ||
      !last_name ||
      !email ||
      !password ||
      !address ||
      !mobile
    ) {
      throw new BadRequestException('All fields are required');
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      id: uniqueId(),
      first_name,
      last_name,
      email,
      password: hashedPassword,
      address,
      mobile,
    };
    return await User.create(newUser);
  }
}
