import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { CreateSurveyResponseInput } from './inputs/create-survey-response.input';
import { UpdateSurveyResponseInput } from './inputs/update-survey-response.input';

@Injectable()
export class SurveyRepository {
  constructor(
    private readonly txHost: TransactionHost<TransactionalAdapterPrisma>,
  ) {}

  public async selectOptionsByQuestionIdx(
    idx: number,
    questionIdx: number,
  ): Promise<number[]> {
    const surveyResponses = await this.txHost.tx.surveyResponse.findMany({
      where: {
        userIdx: idx,
        questionIdx: questionIdx,
        deletedAt: null,
      },
      select: {
        optionIdx: true,
      },
    });

    return surveyResponses.map((response) => response.optionIdx);
  }

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

  public async deleteSurveyResponses(idx: number): Promise<void> {
    await this.txHost.tx.surveyResponse.updateMany({
      where: {
        userIdx: idx,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
