import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SurveyService } from './survey.service';
import { CreateSurveyResponseDto } from './dto/request/create-survey-response.dto';
import { GetSurveyResponseOutDto } from './dto/response/get-survey-response.dto';

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  // TODO : 토큰 구현후 userIdx 받는 방식 변경 / 유효성 검사 추가

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

  @Put('/response')
  async updateSurveyResponse(
    @Param('idx') idx: number,
    @Body() updateSurveyResponseDto: CreateSurveyResponseDto,
  ): Promise<void> {
    await this.surveyService.updateSurveyResponse(idx, updateSurveyResponseDto);
  }

  @Delete('/response')
  async deleteSurveyResponse(
    @Param('idx') idx: number,
    @Body('questionIdx') questionIdx: number,
  ): Promise<void> {
    await this.surveyService.deleteSurveyResponse(idx, questionIdx);
  }
}
