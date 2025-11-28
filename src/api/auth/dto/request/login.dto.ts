import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  /**
   * 로그인 ID
   *
   * @example "user123"
   */
  @IsString()
  @IsNotEmpty()
  public id: string;

  /**
   * 비밀번호
   *
   * @example "securePassword!"
   */
  @IsString()
  @IsNotEmpty()
  public password: string;
}
