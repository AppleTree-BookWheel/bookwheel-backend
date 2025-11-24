import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { LoginTokenService } from '../login-token.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly loginTokenService: LoginTokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('loginJwt.refreshSecret')!,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload) {
    const refreshToken = req.get('Authorization')?.replace('Bearer', '').trim();

    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token provided');
    }

    const isValid = await this.loginTokenService.validateRefreshToken(
      payload.refreshTokenId,
      payload.idx,
    );

    if (!isValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return { idx: payload.idx, refreshTokenId: payload.refreshTokenId };
  }
}
