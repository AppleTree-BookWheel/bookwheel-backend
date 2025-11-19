import { IsArray, IsInt, IsNotEmpty } from 'class-validator';

export class UpdateSurveyResponseDto {
  /**
   * 응답할 질문 식별자
   *
   * @example 1
   */
  @IsNotEmpty()
  @IsInt()
  questionIdx: number;

  /**
   * 선택된 옵션 식별자 목록
   *
   * @example [2, 3, 4]
   */
  @IsArray()
  @IsInt({ each: true })
  optionIdx?: number[];
}
