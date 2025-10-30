import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { CreateSurveyResponseInput } from './inputs/create-survey-response.input';
import { UpdateSurveyResponseInput } from './inputs/update-survey-response.input';
import {
  SELECT_SURVEY_RESPONSE,
  SelectSurveyResponse,
} from './model/prisma-type/select-survey-response';

@Injectable()
export class SurveyRepository {
  constructor(
    private readonly txHost: TransactionHost<TransactionalAdapterPrisma>,
  ) {}

  public async selectSurveyResponseByQuestionIdx(
    idx: number,
    questionIdx: number,
  ): Promise<SelectSurveyResponse[] | null> {
    return await this.txHost.tx.surveyResponse.findMany({
      ...SELECT_SURVEY_RESPONSE,
      where: {
        userIdx: idx,
        questionIdx: questionIdx,
        deletedAt: null,
      },
    });
  }

  // insert는 한 번에 여러 질문의 답변(optionIdx)을 넣을 수 있도록 구현
  public async insertSurveyResponse(
    idx: number,
    input: CreateSurveyResponseInput,
  ): Promise<void> {
    const { questionIdx, optionIdx } = input;
    const responseData = optionIdx.map((optionId) => ({
      userIdx: idx,
      questionIdx: questionIdx,
      optionIdx: optionId,
    }));

    await this.txHost.tx.surveyResponse.createMany({
      data: responseData,
    });
  }

  public async updateSurveyResponse(
    idx: number,
    input: UpdateSurveyResponseInput,
  ): Promise<void> {
    const { questionIdx, optionIdx } = input;

    await this.txHost.tx.surveyResponse.updateMany({
      where: {
        userIdx: idx,
        questionIdx: questionIdx,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    await this.insertSurveyResponse(idx, input);
  }

  public async deleteSurveyResponse(
    idx: number,
    questionIdx: number,
  ): Promise<void> {
    await this.txHost.tx.surveyResponse.updateMany({
      where: {
        userIdx: idx,
        questionIdx: questionIdx,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
