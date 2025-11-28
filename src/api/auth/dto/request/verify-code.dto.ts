import { IsEmail, IsString } from 'class-validator';

export class VerifyCodeDto {
  /**
   * 인증번호를 받을 이메일 주소
   *
   * @example "bookwheel@example.com"
   */
  @IsEmail()
  email: string;

  /**
   * 사용자가 입력한 6자리 인증 코드
   *
   * @example "123456"
   */
  @IsString()
  code: string;
}
