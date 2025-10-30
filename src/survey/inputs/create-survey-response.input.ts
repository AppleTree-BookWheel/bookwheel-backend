import { QuestionType } from 'src/survey/constants/survey-question.enum';

export class CreateSurveyResponseInput {
  questionIdx: QuestionType;
  optionIdx?: number[];
}
