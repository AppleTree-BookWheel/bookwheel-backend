import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { GenderType } from 'src/api/user/constants/gender-type.enum';
import { UserType } from 'src/api/user/constants/user-type.enum';
import { UserBasicDto } from './user-basic.dto';

export class CreateUserDto {
  /**
   * 닉네임
   *
   * @example "햄스터"
   */
  @IsOptional()
  @IsString()
  public nickname?: string;

  /**
   * 프로필 이미지 경로
   *
   * @example /user/1/profile.jpg
   */
  @IsOptional()
  @IsString()
  public profileImagePath?: string;

  /**
   * 나이
   *
   * @example 25
   */
  @IsOptional()
  @IsInt()
  public age?: number;

  /**
   * 성별 (FEMALE 또는 MALE)
   *
   * @example FEMALE
   */
  @IsOptional()
  @IsEnum(GenderType)
  public gender?: GenderType;

  /**
   * 로그인 방식 (BASIC 또는 SOCIAL)
   *
   * @example BASIC
   */
  @IsNotEmpty()
  @IsEnum(UserType)
  public type: UserType;

  /**
   * 일반 회원가입 정보 (BASIC 타입일 경우 필수)
   */
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UserBasicDto)
  public basicAuths: UserBasicDto;
}
