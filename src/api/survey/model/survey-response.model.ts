import { SelectSurveyResponse } from './prisma-type/select-survey-response'; // 💡 Repository의 Payload 타입 Import

export class SurveyResponseModel {
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

  constructor(data: SurveyResponseModel) {
    Object.assign(this, data);
  }

  static fromPrisma(
    responses: SelectSurveyResponse[],
  ): SurveyResponseModel | null {
    if (responses.length === 0) {
      return null;
    }

    const optionIds = responses.map((response) => response.optionIdx);

    const questionIdx = responses[0].option.questionIdx;

    return new SurveyResponseModel({
      questionIdx: questionIdx,
      optionIdx: optionIds,
    });
  }
}
