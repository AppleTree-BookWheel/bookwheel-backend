import { QuestionType } from '../constants/survey-question.enum';

export class CreateSurveyResponseInput {
  questionIdx: QuestionType;
  optionIdx: number[];
}
