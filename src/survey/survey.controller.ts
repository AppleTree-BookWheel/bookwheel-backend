import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { CreateSurveyResponseInput } from './inputs/create-survey-response.input';
import { CreateSurveyResponseDto } from './dto/request/create-survey-response.dto';
import { GetSurveyResponseOutDto } from './dto/response/get-survey-response.dto';

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  // TODO : 토큰 구현후 userIdx 받는 방식 변경

  @Get('/response')
  async getSurveyResponseByQuestionIdx(
    @Param('idx') idx: number,
    @Body('questionIdx') questionIdx: number,
  ): Promise<GetSurveyResponseOutDto | null> {
    return this.surveyService.getSurveyResponseByQuestionIdx(idx, questionIdx);
  }

  @Post('/response')
  async createSurveyResponse(
    @Param('idx') idx: number,
    @Body() createSurveyResponseDto: CreateSurveyResponseDto,
  ): Promise<void> {
    await this.surveyService.createSurveyResponse(idx, createSurveyResponseDto);
  }
}
