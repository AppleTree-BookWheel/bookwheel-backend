import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginTokenService {
  private readonly ACCESS_TOKEN_EXPIRES_IN: number;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    const config = this.configService.get('loginJwt');

    this.ACCESS_TOKEN_EXPIRES_IN = config.expiresIn;
  }

  private async issueAccessToken(idx: number, refreshTokenId: string) {
    const payload = {
      idx,
      refreshTokenId,
    };

    return this.jwtService.sign(payload, {
      expiresIn: `${this.ACCESS_TOKEN_EXPIRES_IN}m`,
    });
  }
}
