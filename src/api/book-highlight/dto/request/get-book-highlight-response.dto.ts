export class GetBookHighlightResponseDto {
  /**
   * 하이라이트 식별자
   *
   * @example 1
   */
  idx: number;
  /**
   * 작성자 식별자
   *
   * @example 10
   */
  userIdx: number;
  /**
   * 파티 식별자
   *
   * @example 5
   */
  partyIdx: number;
  /**
   * 전자책 내 하이라이트 위치 정보 (CFI)
   *
   * @example "epubcfi(/6/4[chap01ref]!/4/2/1:0)"
   */
  cfiRange: string;
  /**
   * 하이라이트 색상 코드
   *
   * @example "#FF5733"
   */
  colorCode: string;
  /**
   * 생성 일시
   *
   * @example "2023-10-25T12:00:00.000Z"
   */
  createdAt: Date;
}
