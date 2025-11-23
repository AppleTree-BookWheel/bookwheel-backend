import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  /**
   * 로그인 ID
   */
  @IsString()
  @IsNotEmpty()
  public id: string;

  /**
   * 비밀번호
   */
  @IsString()
  @IsNotEmpty()
  public password: string;
}
