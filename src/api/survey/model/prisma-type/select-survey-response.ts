import { Prisma } from '@prisma/client';

export const SELECT_SURVEY_RESPONSE =
  Prisma.validator<Prisma.SurveyResponseDefaultArgs>()({
    select: {
      optionIdx: true,

      option: {
        select: {
          questionIdx: true,
        },
      },
    },
  });

export type SelectSurveyResponse = Prisma.SurveyResponseGetPayload<
  typeof SELECT_SURVEY_RESPONSE
>;
