import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendVerificationEmail() {
    const verificationCode = '123456';
    await this.mailerService.sendMail({
      to: 'heeju03180@naver.com',
      subject: '책바퀴 이메일 인증 코드',
      template: './verification',
      context: { verificationCode },
    });
  }
}
