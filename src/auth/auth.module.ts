import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfig } from 'src/config/mailer.config';

@Module({
  imports: [MailerModule.forRootAsync(new mailerConfig())],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
