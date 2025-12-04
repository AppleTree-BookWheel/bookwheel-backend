export class GetCommentResponseDto {
  /**
   * 댓글 idx
   *
   * @example 1
   */
  idx: number;

  /**
   * 사용자 식별자 idx
   *
   * @example 1
   */
  userIdx: number;

  /**
   * 하이라이트 식별자 idx
   *
   * @example 1
   */
  highlightIdx: number;

  /**
   * 댓글 내용
   *
   * @example "This is a comment."
   */
  content: string;

  /**
   * 댓글 생성일
   *
   * @example 2025-11-16T15:00:00.000Z
   */
  createdAt: Date;

  /**
   * 작성자 닉네임
   *
   * @example "햄스터"
   */
  nickname: string;

  /**
   * 작성자 프로필 이미지 경로
   *
   * @example /user/1/profile.jpg
   */
  profileImagePath: string | null;
}
