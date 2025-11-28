import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = any>(err: any, user: any, info: any): TUser {
    if (err || !user) {
      if (info?.name === 'TokenExpiredError') {
        throw new UnauthorizedException('AccessToken 만료');
      }

      if (info?.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('유효하지 않은 AccessToken');
      }

      throw err || new UnauthorizedException('인증 실패');
    }
    return user;
  }
}
