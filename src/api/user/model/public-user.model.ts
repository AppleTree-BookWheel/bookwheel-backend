import { GenderType } from '../constants/gender-type.enum';
import { SelectPublicUser } from './prisma-type/select-public-user'; // 💡 이전에 만든 Type Import

/**
 * 공개 사용자 정보 모델
 * (친구 검색, 파티 멤버 조회 등 타인에게 노출되는 정보)
 */
export class PublicUserModel {
  /**
   * 사용자 식별자
   *
   * @example 1
   */
  public idx: number;

  /**
   * 닉네임
   *
   * @example "책바퀴_러너"
   */
  public nickname: string;

  /**
   * 프로필 이미지 경로
   *
   * @example "/profile/1.png"
   */
  public profileImagePath: string | null;

  /**
   * 나이
   * @example 25
   */
  public age: number | null;

  /**
   * 성별
   * @example FEMALE
   */
  public gender: GenderType | null;

  constructor(data: PublicUserModel) {
    Object.assign(this, data);
  }

  public static fromPrisma(user: SelectPublicUser): PublicUserModel {
    return new PublicUserModel({
      idx: user.idx,
      nickname: user.nickname,
      profileImagePath: user.profileImagePath || null,
      age: user.age || null,
      gender: (user.gender as GenderType) || null,
    });
  }
}
