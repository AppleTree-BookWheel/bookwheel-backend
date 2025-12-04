export class CreateCommentDto {
  /**
   * 하이라이트 idx
   *
   * @example 1
   */
  highlightIdx: number;

  /**
   * 도서 idx
   *
   * @example 1
   */
  bookIdx: number;

  /**
   * 댓글 내용
   *
   * @example "This is a comment."
   */
  content: string;
}
