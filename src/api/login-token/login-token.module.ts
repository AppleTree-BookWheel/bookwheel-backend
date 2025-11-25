import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from 'src/redis/redis.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { LoginTokenService } from './login-token.service';
import { PassportModule } from '@nestjs/passport';
import loginTokenConfig from 'src/config/login-token.config';

@Module({
  imports: [
    ConfigModule.forFeature(loginTokenConfig),
    RedisModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('loginJwt.secret'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [LoginTokenService, JwtStrategy, JwtRefreshStrategy],

  exports: [
    LoginTokenService,
    JwtModule,
    JwtStrategy,
    JwtRefreshStrategy,
    PassportModule,
  ],
})
export class LoginTokenModule {}
