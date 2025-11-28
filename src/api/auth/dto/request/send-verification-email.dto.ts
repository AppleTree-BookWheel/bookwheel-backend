import { IsEmail } from 'class-validator';

export class SendVerificationEmailDto {
  /**
   * 인증번호를 받을 이메일 주소
   *
   * @example "bookwheel@example.com"
   */
  @IsEmail()
  email: string;
}
