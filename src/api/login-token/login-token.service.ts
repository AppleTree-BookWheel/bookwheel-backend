import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoginTokenService {
  private readonly ACCESS_TOKEN_EXPIRES_IN: number;
  private readonly REFRESH_TOKEN_EXPIRES_IN: number;
  private readonly ACCESS_SECRET: string;
  private readonly REFRESH_SECRET: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    const config = this.configService.get('loginJwt');

    this.ACCESS_TOKEN_EXPIRES_IN = config.expiresIn;
    this.ACCESS_SECRET = config.secret;
    this.REFRESH_TOKEN_EXPIRES_IN = config.refreshExpiresIn;
    this.REFRESH_SECRET = config.refreshSecret;
  }

  public async issueTokenSet(idx: number) {
    const refreshTokenId = uuidv4();

    const [accessToken, refreshToken] = await Promise.all([
      this.issueAccessToken(idx, refreshTokenId),
      this.issueRefreshToken(idx, refreshTokenId),
    ]);

    return {
      accessToken,
      refreshToken,
      refreshTokenId,
    };
  }
  private async issueAccessToken(idx: number, refreshTokenId: string) {
    const payload = {
      idx,
      refreshTokenId,
    };

    return this.jwtService.sign(payload, {
      secret: this.ACCESS_SECRET,
      expiresIn: `${this.ACCESS_TOKEN_EXPIRES_IN}m`,
    });
  }

  private async issueRefreshToken(idx: number, refreshTokenId: string) {
    const payload = {
      idx,
      refreshTokenId,
    };

    return this.jwtService.sign(payload, {
      secret: this.REFRESH_SECRET,
      expiresIn: `${this.REFRESH_TOKEN_EXPIRES_IN}d`,
    });
  }
}
