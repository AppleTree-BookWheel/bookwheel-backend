import { IsEmail, IsString } from 'class-validator';

export class VerifyCodeDto {
  @IsEmail()
  email: string;

  @IsString()
  code: string; // 사용자가 입력한 6자리 코드
}
