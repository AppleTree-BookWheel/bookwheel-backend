import { MailerService } from '@nestjs-modules/mailer';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { SendVerificationEmailDto } from './dto/request/send-verification-email.dto';
import { VerifyCodeDto } from './dto/request/verify-code.dto';
import { CreateCodeDto } from './dto/request/create-code.dto';
import { UserRepository } from '../user/user.repository';
import { CreateUserInput } from './inputs/create-user.input';
import * as HashUtil from '../../utils/hash.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly redisService: RedisService,
    private readonly userRepository: UserRepository,
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

  public async checkDuplicateId(id: string): Promise<boolean> {
    const user = this.userRepository.selectUserById(id);
    return !user; // 존재하지 않으면 true 반환 (사용가능)
  }

  public async signUp(input: CreateUserInput): Promise<void> {
    const existId = await this.userRepository.selectUserById(
      input.basicAuths.id,
    );
    if (existId) {
      throw new BadRequestException('Already existing ID.');
    }

    const hashedPassword = await HashUtil.hashPassword(
      input.basicAuths.password,
    );

    await this.userRepository.insertUser({
      ...input,
      basicAuths: {
        ...input.basicAuths,
        password: hashedPassword,
      },
    });
  }
}
