import { QuestionType } from '../constants/survey-question.enum';

export class UpdateSurveyResponseInput {
  questionIdx: QuestionType;
  optionIdx: number[];
}
