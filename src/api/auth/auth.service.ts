import { MailerService } from '@nestjs-modules/mailer';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { UserRepository } from '../user/user.repository';
import { CreateUserInput } from './inputs/create-user.input';
import * as HashUtil from '../../utils/hash.util';
import { LoginInput } from './inputs/login.input';
import { JwtService } from '@nestjs/jwt';
import { LoginTokenService } from '../login-token/login-token.service';
import { ReissueTokenSetInput } from './inputs/reissue-token-set.input';
import { SendVerificationEmailInput } from './inputs/send-verification-email.input';
import { CreateCodeInput } from './inputs/create-code.input';
import { VerifyCodeInput } from './inputs/verify-code.input';
import { TokenSet } from './model/token-set.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly redisService: RedisService,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly loginTokenService: LoginTokenService,
  ) {}

  // TODO : Transaction 처리 / User 존재 여부 확인 추가

  public async sendVerificationEmail(
    sendVerificationEmailInput: SendVerificationEmailInput,
  ): Promise<void> {
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    await this.createCode({
      email: sendVerificationEmailInput.email,
      code: verificationCode,
    });

    await this.mailerService.sendMail({
      to: sendVerificationEmailInput.email,
      subject: '책바퀴 이메일 인증 코드',
      template: './verification',
      context: { verificationCode },
    });
  }

  public async createCode(createCodeInput: CreateCodeInput): Promise<void> {
    const redisKey = `email_verification:${createCodeInput.email}`;
    const ttl = 5 * 60; // 유효기간 5분
    await this.redisService.set(redisKey, createCodeInput.code, 'EX', ttl);
  }

  public async verifyCode(verifyCodeInput: VerifyCodeInput): Promise<void> {
    const storedCode = await this.redisService.get(
      `email_verification:${verifyCodeInput.email}`,
    );

    if (!storedCode) {
      throw new NotFoundException(
        '인증 코드가 만료되었거나 존재하지 않습니다.',
      );
    }

    if (storedCode !== verifyCodeInput.code) {
      throw new BadRequestException('인증 코드가 일치하지 않습니다.');
    }

    await this.redisService.del(`email_verification:${verifyCodeInput.email}`);
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

  public async login(input: LoginInput): Promise<TokenSet> {
    const user = await this.userRepository.selectUserById(input.id);
    if (!user || !user.basicAuths) {
      throw new NotFoundException('Invalid Id');
    }

    const isPasswordValid = await HashUtil.comparePassword(
      input.password,
      user.basicAuths.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password.');
    }

    return this.loginTokenService.issueTokenSet(user.idx);
  }

  public async logout(refreshTokenId: string): Promise<void> {
    await this.loginTokenService.deleteRefreshToken(refreshTokenId);
  }

  public async reissueTokenSet(input: ReissueTokenSetInput) {
    return this.loginTokenService.reissueRefreshToken(
      input.refreshTokenId,
      input.idx,
    );
  }
}
