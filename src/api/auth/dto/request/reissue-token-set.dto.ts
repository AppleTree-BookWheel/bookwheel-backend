import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReissueTokenSetDto {
  @IsNotEmpty()
  @IsString()
  refreshTokenId: string;

  @IsNotEmpty()
  @IsNumber()
  idx: number;
}
