import { GenderType } from '../../constants/gender-type.enum';

/**
 * 공개 사용자 정보 응답 DTO
 */
export class GetPublicUserResponseDto {
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
}
