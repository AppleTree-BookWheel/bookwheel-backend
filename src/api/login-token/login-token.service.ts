import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class LoginTokenService {
  private readonly ACCESS_TOKEN_EXPIRES_IN: number;
  private readonly REFRESH_TOKEN_EXPIRES_IN: number;
  private readonly ACCESS_SECRET: string;
  private readonly REFRESH_SECRET: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {
    const config = this.configService.get('loginJwt');

    this.ACCESS_TOKEN_EXPIRES_IN = config.expiresIn;
    this.ACCESS_SECRET = config.secret;
    this.REFRESH_TOKEN_EXPIRES_IN = config.refreshExpiresIn;
    this.REFRESH_SECRET = config.refreshSecret;
  }

  public async issueTokenSet(idx: number) {
    const refreshTokenId = randomUUID();

    const [accessToken, refreshToken] = await Promise.all([
      this.issueAccessToken(idx, refreshTokenId),
      this.issueRefreshToken(idx, refreshTokenId),
    ]);

    await this.saveRefreshToken(refreshTokenId, idx);

    return {
      accessToken,
      refreshToken,
      refreshTokenId,
    };
  }

  public async validateRefreshToken(refreshTokenId: string, idx: number) {
    const key = `refreshToken:${refreshTokenId}`;
    const storedIdx = await this.redisService.get(key);

    if (!storedIdx || storedIdx !== idx.toString()) {
      return false;
    }

    return true;
  }

  public async reissueRefreshToken(refreshTokenId: string, idx: number) {
    await this.redisService.del(`refreshToken:${refreshTokenId}`);

    return this.issueTokenSet(idx);
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

  private async saveRefreshToken(refreshTokenId: string, idx: number) {
    const seconds = this.REFRESH_TOKEN_EXPIRES_IN * 24 * 60 * 60;

    await this.redisService.set(
      `refreshToken:${refreshTokenId}`,
      idx.toString(),
      seconds,
    );
  }
}
