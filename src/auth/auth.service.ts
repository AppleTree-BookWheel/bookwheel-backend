import { MailerService } from '@nestjs-modules/mailer';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthRepository } from './auth.repotiory';
import { RedisService } from 'src/redis/redis.service';
import { SendVerificationEmailDto } from './dto/request/send-verification-email.dto';
import { VerifyCodeDto } from './dto/request/verify-code.dto';
import { CreateCodeDto } from './dto/request/create-code.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly authRepository: AuthRepository,
    private readonly redisService: RedisService,
  ) {}

  // TODO : Transaction 처리 / User 존재 여부 확인 추가
  public async sendVerificationEmail(
    sendVerificationEmailDto: SendVerificationEmailDto,
  ): Promise<void> {
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    await this.createCode({
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

  public async createCode(createCodeDto: CreateCodeDto): Promise<void> {
    const redisKey = `email_verification:${createCodeDto.email}`;
    const ttl = 5 * 60; // 유효기간 5분
    await this.redisService.set(redisKey, createCodeDto.code, 'EX', ttl);
  }

  public async verifyCode(verifyCodeDto: VerifyCodeDto): Promise<void> {
    const storedCode = await this.redisService.get(
      `email_verification:${verifyCodeDto.email}`,
    );

    if (!storedCode) {
      throw new NotFoundException(
        '인증 코드가 만료되었거나 존재하지 않습니다.',
      );
    }

    if (storedCode !== verifyCodeDto.code) {
      throw new BadRequestException('인증 코드가 일치하지 않습니다.');
    }

    await this.redisService.del(`email_verification:${verifyCodeDto.email}`);
  }
}
