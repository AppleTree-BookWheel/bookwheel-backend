import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class UpdatePartyDto {
  /**
   * 파티 식별자
   *
   * @example 15
   */
  @IsNotEmpty()
  @IsInt()
  partyIdx: number;

  /**
   * 파티 제목
   *
   * @example "이 책 같이 읽을 사람 구해요"
   */
  @IsNotEmpty()
  @IsString()
  title?: string;

  /**
   * 파티 설명
   *
   * @example "매일 1시간씩 읽어요"
   */
  @IsNotEmpty()
  @IsString()
  description?: string;

  /**
   * 최대 모집 인원
   *
   *  @example 10
   */
  @IsNotEmpty()
  @IsInt()
  maxMembers?: number;

  /**
   * 파티 시작 날짜
   *
   * @example "2025-01-01T00:00:00.000Z"
   */
  @IsNotEmpty()
  @IsDate()
  startDate?: Date;

  /**
   * 비공개 여부
   *
   * @example false
   */
  @IsNotEmpty()
  @IsBoolean()
  isPrivate?: boolean;

  /**
   * 비밀번호 (비공개일 경우 필수)
   *
   *  @example "1234"
   */
  @IsNotEmpty()
  @IsString()
  password?: string;

  /**
   * 초대할 유저들의 식별자 목록 (선택)
   *
   * @example [2, 5, 8]
   */
  @IsNotEmpty()
  @IsInt({ each: true })
  invitedUserIdxs?: number[];
}
