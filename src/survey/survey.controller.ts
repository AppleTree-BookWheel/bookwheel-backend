import { Body, Controller, Get, Param } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { GetSurveyResponseDto } from './dto/response/get-survey-response.dto';

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  // TODO : 토큰 구현후 userIdx 받는 방식 변경

  @Get('/response')
  async getSurveyResponseByQuestionIdx(
    @Param('idx') idx: number,
    @Body('questionIdx') questionIdx: number,
  ): Promise<GetSurveyResponseDto | null> {
    return this.surveyService.getSurveyResponseByQuestionIdx(idx, questionIdx);
  }
}
