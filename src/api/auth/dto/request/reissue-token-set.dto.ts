import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReissueTokenSetDto {
  /**
   * 재발급에 사용할 Refresh Token의 고유 ID (UUID)
   *
   *  @example "550e8400-e29b-41d4-a716-446655440000"
   */
  @IsNotEmpty()
  @IsString()
  refreshTokenId: string;

  /**
   * 사용자 식별자 idx
   *
   *  @example 1
   */
  @IsNotEmpty()
  @IsNumber()
  idx: number;
}
