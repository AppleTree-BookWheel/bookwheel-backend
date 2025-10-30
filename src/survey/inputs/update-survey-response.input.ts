import { QuestionType } from 'src/survey/constants/survey-question.enum';

export class UpdateSurveyResponseInput {
  questionIdx: QuestionType;
  optionIdx: number[];
}
