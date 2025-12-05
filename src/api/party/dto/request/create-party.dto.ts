import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePartyDto {
  /**
   * 책 식별자
   *
   * @example 10
   */
  @IsInt()
  @IsNotEmpty()
  bookIdx: number;

  /**
   * 파티 제목
   *
   * @example "이 책 같이 읽을 사람 구해요"
   */
  @IsString()
  @IsNotEmpty()
  title: string;

  /**
   * 파티 설명
   *
   * @example "매일 1시간씩 읽어요"
   */
  @IsString()
  @IsNotEmpty()
  description: string;

  /**
   * 최대 모집 인원
   *
   * @example 10
   */
  @IsInt()
  @IsNotEmpty()
  maxMembers: number;

  /**
   * 파티 시작 날짜 (선택)
   *
   * - 값이 없으면 즉시 시작으로 간주하거나 null 저장
   * @example "2025-01-01T00:00:00.000Z"
   */
  @IsOptional()
  @Type(() => Date) // 문자열을 Date 객체로 변환
  @IsDate()
  startDate?: Date;

  /**
   * 비공개 여부
   *
   * @example false
   */
  @IsBoolean()
  @IsNotEmpty()
  isPrivate: boolean;

  /**
   * 비밀번호 (비공개일 경우 필수)
   *
   * @example "1234"
   */
  @IsOptional()
  @IsString()
  password?: string;

  /**
   * 초대할 유저들의 식별자 목록 (선택)
   *
   * @example [2, 5, 8]
   */
  @IsOptional()
  @IsArray()
  @IsInt({ each: true }) // 배열 내부의 각 요소가 정수인지 검사
  invitedUserIdxs?: number[];
}
