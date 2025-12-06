import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class GetPartyResponseDto {
  @IsNotEmpty()
  @IsInt()
  idx: number;

  @IsNotEmpty()
  @IsInt()
  hostUserIdx: number;

  @IsNotEmpty()
  @IsInt()
  bookIdx: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  maxMembers: number;

  @IsNotEmpty()
  @IsInt()
  currentMembers: number;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsDate()
  startDate: Date | null;

  @IsNotEmpty()
  @IsBoolean()
  isPrivate: boolean;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @IsNotEmpty()
  @IsString()
  bookTitle: string;

  @IsNotEmpty()
  @IsString()
  bookCoverImagePath: string;
}
