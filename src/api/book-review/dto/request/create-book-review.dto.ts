import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBookReviewDto {
  /**
   * 책 고유 idx
   *
   * @example 1
   */
  @IsNotEmpty()
  @IsInt()
  bookIdx: number;

  /**
   * 평점
   *
   * @example 5
   */
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  /**
   * 리뷰 내용
   *
   * @example "정말 재미있는 책이었어요!"
   */
  @IsOptional()
  @IsString()
  content?: string;
}
