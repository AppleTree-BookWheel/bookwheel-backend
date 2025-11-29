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
  ): Promise<SelectSurveyResponse[]> {
    return await this.txHost.tx.surveyResponse.findMany({
      ...SELECT_SURVEY_RESPONSE,
      where: {
        userIdx: idx,
        deletedAt: null,
        option: {
          questionIdx: questionIdx,
        },
      },
    });
  }

  public async insertSurveyResponse(
    userIdx: number,
    inputs: CreateSurveyResponseInput[],
  ): Promise<void> {
    const responseData = inputs.flatMap((input) => {
      const { optionIdx } = input;
      const validOptionIdx = optionIdx || [];

      return validOptionIdx.map((optionId) => ({
        userIdx: userIdx,
        optionIdx: optionId,
      }));
    });

    if (responseData.length > 0) {
      await this.txHost.tx.surveyResponse.createMany({
        data: responseData,
        skipDuplicates: true,
      });
    }
  }

  public async updateSurveyResponse(
    userIdx: number,
    inputs: UpdateSurveyResponseInput[],
  ): Promise<void> {
    const questionIdxList = inputs.map((input) => input.questionIdx);

    if (questionIdxList.length > 0) {
      await this.txHost.tx.surveyResponse.deleteMany({
        where: {
          userIdx: userIdx,
          option: {
            questionIdx: {
              in: questionIdxList,
            },
          },
        },
      });
    }

    if (inputs.length > 0) {
      await this.insertSurveyResponse(userIdx, inputs);
    }
  }

  public async deleteSurveyResponse(
    idx: number,
    questionIdx: number,
  ): Promise<void> {
    await this.txHost.tx.surveyResponse.deleteMany({
      where: {
        userIdx: idx,
        deletedAt: null,
        option: {
          questionIdx: questionIdx,
        },
      },
    });
  }
}
