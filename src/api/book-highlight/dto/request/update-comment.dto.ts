import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateCommentDto {
  /**
   * 댓글 고유 번호
   *
   * @example 1
   */
  @IsInt()
  @IsNotEmpty()
  commentIdx: number;

  /**
   * 수정할 댓글 내용
   *
   * @example "Updated comment content."
   */
  @IsString()
  @IsNotEmpty()
  content: string;
}
