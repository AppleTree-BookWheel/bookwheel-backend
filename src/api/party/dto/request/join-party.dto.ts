import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class JoinPartyDto {
  /**
   * 파티 idx
   *
   * @example 1
   */
  @IsNotEmpty()
  @IsInt()
  partyIdx: number;

  /**
   * 파티 비밀번호
   *
   * @example "partyPassword"
   */
  @IsOptional()
  @IsString()
  password?: string;
}
