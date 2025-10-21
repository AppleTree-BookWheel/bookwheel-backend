import { IsEmail, IsString } from 'class-validator';

export class CreateVerificationCodeDto {
  @IsEmail()
  email: string;

  @IsString()
  code: string;
}
