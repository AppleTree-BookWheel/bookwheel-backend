export class CreateHighlightInput {
  /**
   * 파티 식별자
   */
  partyIdx: number;

  /**
   * 책 식별자
   */
  bookIdx: number;

  /**
   * 하이라이트 위치 정보 (CFI)
   */
  cfiRange: string;

  /**
   * 하이라이트 텍스트 내용 (New!)
   */
  content: string;

  /**
   * 하이라이트 색상 코드
   * @example "#FF5733"
   */
  colorCode: string;
}
