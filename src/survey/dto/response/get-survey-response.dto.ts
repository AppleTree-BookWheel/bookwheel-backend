import { QuestionType } from 'src/survey/constants/survey-question.enum';

export class GetSurveyResponseDto {
  /**
   * 질문 idx
   *
   * @example 1
   */
  questionIdx: QuestionType;

  /**
   * 선택된 옵션 배열
   *
   * @example [2, 3, 4]
   */
  optionIdx: number[];
}
