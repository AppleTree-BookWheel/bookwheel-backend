import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfig } from 'src/config/mailer.config';
import { AuthRepository } from './auth.repotiory';

@Module({
  imports: [MailerModule.forRootAsync(new mailerConfig())],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
})
export class AuthModule {}
