export class UpdateCommentDto {
  /**
   * 댓글 고유 번호
   *
   * @example 1
   */
  commentIdx: number;

  /**
   * 수정할 댓글 내용
   *
   * @example "Updated comment content."
   */
  content: string;
}
