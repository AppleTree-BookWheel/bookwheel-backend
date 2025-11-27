import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

/**
 * 일반 회원가입 유저의 createUserDto 를 위한 내부 dto
 */
export class UserBasicDto {
  /**
   * 로그인 ID
   *
   * @example "user123"
   */
  @IsNotEmpty()
  @IsString()
  public id: string;

  /**
   * 비밀번호
   *
   * @example "securePassword!"
   */
  @IsNotEmpty()
  @IsString()
  public password: string;

  /**
   * 이메일 주소
   *
   * @example "bookwheel@naver.com"
   */
  @IsNotEmpty()
  @IsEmail()
  public email: string;
}
