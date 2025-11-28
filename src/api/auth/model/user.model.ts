import { GenderType } from 'src/api/user/constants/gender-type.enum';
import { UserType } from 'src/api/user/constants/user-type.enum';
import { SelectUser } from 'src/api/user/model/prisma-type/select-user';

export class UserModel {
  /**
   * 사용자 식별자
   *
   * @example 1
   */
  public idx: number;

  /**
   * 닉네임
   *
   * @example "새로운햄스터"
   */
  public nickname: string;

  /**
   * 프로필 이미지 경로
   *
   * @example "/profile/1.png"
   */
  public profileImagePath: string | null;

  /**
   * 로그인 방식
   *
   * @example BASIC
   */
  public type: UserType;

  /**
   * 나이
   *
   * @example 24
   */
  public age: number | null;

  /**
   * 성별
   *
   * @example FEMALE
   */
  public gender: GenderType | null;

  /**
   * 계정 생성일
   *
   * @example "2023-01-15T13:45:30.000Z"
   */
  public createdAt: Date;

  constructor(data: UserModel) {
    Object.assign(this, data);
  }

  /**
   * Prisma Client에서 반환된 SelectUser 객체를 UserModel로 변환합니다.
   */
  public static fromPrisma(user: SelectUser): UserModel {
    return new UserModel({
      idx: user.idx,
      nickname: user.nickname,
      profileImagePath: user.profileImagePath || null,
      type: user.type as UserType,
      age: user.age || null,
      gender: ((user as any).gender as GenderType) || null,
      createdAt: user.createdAt,
    });
  }
}
