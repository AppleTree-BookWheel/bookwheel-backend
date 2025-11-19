import { GenderType } from '../../constants/gender-type.enum';
import { UserType } from '../../constants/user-type.enum';

/**
 * 사용자 생성 응답 DTO
 */
export class GetUserResponseDto {
  /**
   * 사용자 식별자 idx
   *
   * @example 1
   */
  public idx: number;

  /**
   * 닉네임
   *
   * @example "햄스터"
   */
  public nickname: string;

  /**
   * 프로필 이미지 경로
   *
   * @example /user/1/profile.jpg
   */
  public profileImagePath: string | null;

  /**
   * 로그인 방식 (BASIC 또는 SOCIAL)
   *
   * @example BASIC
   */
  public type: UserType;

  /**
   * 나이
   *
   * @example 25
   */
  public age: number | null;

  /**
   * 성별 (FEMALE 또는 MALE)
   *
   * @example FEMALE
   */
  public gender: GenderType | null;

  /**
   * 계정 생성일
   *
   * @example 2025-11-16T15:00:00.000Z
   */
  public createdAt: Date;
}
