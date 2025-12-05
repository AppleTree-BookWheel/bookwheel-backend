import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateHighlightDto {
  /**
   * 파티 식별자
   *
   * @example 1
   */
  @IsInt()
  @IsNotEmpty()
  partyIdx: number;

  /**
   * 책 식별자
   *
   * @example 2
   */
  @IsInt()
  @IsNotEmpty()
  bookIdx: number;

  /**
   * 하이라이트 위치 정보 (CFI)
   *
   * @example "epubcfi(/6/4[chap01ref]!/4/2/1:0)"
   */
  @IsString()
  @IsNotEmpty()
  cfiRange: string;

  /**
   * 하이라이트 텍스트 내용
   *
   * @example "This is a highlighted text."
   */
  @IsString()
  @IsNotEmpty()
  content: string;

  /**
   * 하이라이트 색상 코드
   *
   * @example "#FF5733"
   */
  @IsString()
  @IsNotEmpty()
  colorCode: string;
}
