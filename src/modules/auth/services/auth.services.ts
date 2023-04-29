import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from 'src/modules/user/entities/user.entity';
import { LoginUserDto } from '../dtos/login-user.dto';
import { v4 as uniqueId } from 'uuid';
@Injectable()
// private readonly authModel: typeof User,
export class AuthService {
  constructor(
    // @InjectModel(User)
    private readonly jwtService: JwtService,
  ) {
    console.log('User Service Triggered');
  }

  async signUp(signUpDto: CreateUserDto): Promise<any> {
    const { first_name, last_name, email, password, address, mobile } =
      signUpDto;

    const salt = await bcrypt.genSalt(14);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      id: uniqueId(),
      first_name,
      last_name,
      email,
      password: hashPassword,
      address,
      mobile,
    });

    await user.save();
    const payload = { id: user.id, email: user.email };

    const token = await this.jwtService.sign(payload);

    return { user, token };

    //return user;
  }

  async login(loginDto: LoginUserDto): Promise<any> {
    const { email, password } = loginDto;

    const user = await User.findOne({ where: { email } });
    console.log(user);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const payload = { id: user.id, email: user.email };

    const token = await this.jwtService.sign(payload);

    return { user, token };
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await User.findOne({ where: { email } });
    // console.log(user);
    // console.log(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
