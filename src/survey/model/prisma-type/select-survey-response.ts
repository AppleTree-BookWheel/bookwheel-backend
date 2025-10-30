import { Prisma } from '@prisma/client';

export const SELECT_SURVEY_RESPONSE =
  Prisma.validator<Prisma.SurveyResponseDefaultArgs>()({
    select: {
      questionIdx: true,
      optionIdx: true,
    },
  });

export type SelectSurveyResponse = Prisma.SurveyResponseGetPayload<
  typeof SELECT_SURVEY_RESPONSE
>;
