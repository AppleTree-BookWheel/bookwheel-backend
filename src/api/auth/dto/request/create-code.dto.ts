import { IsEmail, IsString } from 'class-validator';

export class CreateCodeDto {
  /**
   * 인증번호를 받을 이메일 주소
   *
   * @example "bookwheel@naver.com"
   */
  @IsEmail()
  email: string;

  /**
   * 이메일로 전송된 6자리 인증 코드
   *
   * @example "123456"
   */
  @IsString()
  code: string;
}
