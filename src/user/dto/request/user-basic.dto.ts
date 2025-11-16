import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

/**
 * 일반 회원가입 유저의 createUserDto 를 위한 내부 dto
 */
export class UserBasicDto {
  /**
   * 로그인 ID
   */
  @IsNotEmpty()
  @IsString()
  public id: string;

  /**
   * 비밀번호
   */
  @IsNotEmpty()
  @IsString()
  public password: string;

  /**
   * 이메일 주소
   */
  @IsNotEmpty()
  @IsEmail()
  public email: string;
}
