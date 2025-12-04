import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  /**
   * 하이라이트 idx
   *
   * @example 1
   */
  @IsInt()
  @IsNotEmpty()
  highlightIdx: number;

  /**
   * 도서 idx
   *
   * @example 1
   */
  @IsInt()
  @IsNotEmpty()
  bookIdx: number;

  /**
   * 댓글 내용
   *
   * @example "This is a comment."
   */
  @IsString()
  @IsNotEmpty()
  content: string;
}
