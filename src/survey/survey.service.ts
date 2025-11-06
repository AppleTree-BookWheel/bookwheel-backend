import { Injectable } from '@nestjs/common';
import { SurveyRepository } from './survey.repository';
import { CreateSurveyResponseInput } from './inputs/create-survey-response.input';
import { UpdateSurveyResponseInput } from './inputs/update-survey-response.input';
import { SurveyResponseModel } from './model/survey-response.model';

@Injectable()
export class SurveyService {
  constructor(private readonly surveyRepository: SurveyRepository) {}

  public async getSurveyResponseByQuestionIdx(
    idx: number,
    questionIdx: number,
  ): Promise<SurveyResponseModel | null> {
    const response =
      await this.surveyRepository.selectSurveyResponseByQuestionIdx(
        idx,
        questionIdx,
      );

    if (response.length == 0) {
      return null;
    }

    return SurveyResponseModel.fromPrisma(response);
  }

  public async createSurveyResponse(
    idx: number,
    input: CreateSurveyResponseInput,
  ): Promise<void> {
    return this.surveyRepository.insertSurveyResponse(idx, input);
  }

  public async updateSurveyResponse(
    idx: number,
    input: UpdateSurveyResponseInput,
  ): Promise<void> {
    return this.surveyRepository.updateSurveyResponse(idx, input);
  }

  public async deleteSurveyResponse(
    idx: number,
    questionIdx: number,
  ): Promise<void> {
    return this.surveyRepository.deleteSurveyResponse(idx, questionIdx);
  }
}
