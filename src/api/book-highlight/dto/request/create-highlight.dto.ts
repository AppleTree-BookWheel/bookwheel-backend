export class CreateHighlightDto {
  /**
   * 파티 식별자
   *
   * @example 1
   */
  partyIdx: number;

  /**
   * 책 식별자
   *
   * @example 2
   */
  bookIdx: number;

  /**
   * 작성자(유저) 식별자
   *
   * @example 3
   */
  userIdx: number;

  /**
   * 하이라이트 위치 정보 (CFI)
   *
   * @example "epubcfi(/6/4[chap01ref]!/4/2/1:0)"
   */
  cfiRange: string;

  /**
   * 하이라이트 텍스트 내용
   *
   * @example "This is a highlighted text."
   */
  content: string;

  /**
   * 하이라이트 색상 코드
   *
   * @example "#FF5733"
   */
  colorCode: string;
}
