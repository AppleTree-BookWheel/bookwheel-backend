export class GetSurveyResponseOutDto {
  /**
   * 질문 idx
   *
   * @example 1
   */
  questionIdx: number;

  /**
   * 선택된 옵션 배열
   *
   * @example [2, 3, 4]
   */
  optionIdx: number[];
}
