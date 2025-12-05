export class GetMyHighlightResponseDto {
  /**
   * 하이라이트 고유 식별자 (PK)
   *
   * @example 1
   */
  idx: number;

  /**
   * 하이라이트 된 텍스트 내용
   *
   * @example "아버지를 아버지라 부르지 못하고..."
   */
  content: string;

  /**
   * 전자책 내 하이라이트 위치 정보 (CFI)
   *
   * @example "epubcfi(/6/4[chap01ref]!/4/2/1:0)"
   */
  cfiRange: string;

  /**
   * 하이라이트에 달린 댓글 개수
   * (_count 객체에서 추출)
   *
   * @example 3
   */
  commentCount: number;

  /**
   * 생성 일시 (최신순 정렬용)
   *
   * @example "2023-10-25T12:00:00.000Z"
   */
  createdAt: Date;
}
