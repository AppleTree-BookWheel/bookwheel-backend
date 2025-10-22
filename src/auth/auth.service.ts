import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repotiory';
import { RedisService } from 'src/redis/redis.service';
import { CreateVerificationCodeDto } from './dto/request/create-verification-code.dto';
import { SendVerificationEmailDto } from './dto/request/send-verification-email.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly authRepository: AuthRepository,
    private readonly redisService: RedisService,
  ) {}

  public async createVerificationCode(
    createVerificationCodeDto: CreateVerificationCodeDto,
  ): Promise<void> {
    const redisKey = `email_verification:${createVerificationCodeDto.email}`;
    const ttl = 5 * 60; // 유효기간 5분
    await this.redisService.set(
      redisKey,
      createVerificationCodeDto.code,
      'EX',
      ttl,
    );
  }

  // TODO : Transaction 처리 / User 존재 여부 확인 추가
  public async sendVerificationEmail(
    sendVerificationEmailDto: SendVerificationEmailDto,
  ): Promise<void> {
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    await this.createVerificationCode({
      email: sendVerificationEmailDto.email,
      code: verificationCode,
    });

    await this.mailerService.sendMail({
      to: sendVerificationEmailDto.email,
      subject: '책바퀴 이메일 인증 코드',
      template: './verification',
      context: { verificationCode },
    });
  }
}
