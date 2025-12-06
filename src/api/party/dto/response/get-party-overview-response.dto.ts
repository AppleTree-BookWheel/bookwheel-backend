import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class GetPartyOverviewResponseDto {
  @IsNotEmpty()
  @IsInt()
  idx: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  bookIdx: number;

  @IsNotEmpty()
  @IsString()
  bookCoverImagePath: string;
}
