import { IsEmail, IsString } from 'class-validator';

export class CreateCodeDto {
  @IsEmail()
  email: string;

  @IsString()
  code: string; // random 생성된 6자리 코드
}
