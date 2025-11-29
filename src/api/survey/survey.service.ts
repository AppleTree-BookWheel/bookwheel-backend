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
    inputs: CreateSurveyResponseInput[],
  ): Promise<void> {
    return this.surveyRepository.insertSurveyResponse(idx, inputs);
  }

  public async updateSurveyResponse(
    idx: number,
    inputs: UpdateSurveyResponseInput[],
  ): Promise<void> {
    return this.surveyRepository.updateSurveyResponse(idx, inputs);
  }

  public async deleteSurveyResponse(
    idx: number,
    questionIdx: number,
  ): Promise<void> {
    return this.surveyRepository.deleteSurveyResponse(idx, questionIdx);
  }
}
