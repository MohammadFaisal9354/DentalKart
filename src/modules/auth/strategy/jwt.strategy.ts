import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../services/auth.services';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '_secretKey_',
      passReqToCallback: true, // Add this option to pass the request object
    });
  }

  // This below function is verifying that the user having the access rights or not
  private async validate(request: Request, payload: any) {
    //console.log(request);
    const { email } = payload;
    const user = await this.authService.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }

    return user;
  }
}
