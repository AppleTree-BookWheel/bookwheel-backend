import {
  Body,
  Controller,
  Delete,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SurveyService } from './survey.service';
import { CreateSurveyResponseDto } from './dto/request/create-survey-response.dto';
import { GetSurveyResponseOutDto } from './dto/response/get-survey-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { UpdateSurveyResponseDto } from './dto/request/update-survey-response.dto';

@UseGuards(JwtAuthGuard)
@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post('/response/detail')
  async getSurveyResponseByQuestionIdx(
    @User() user,
    @Body('questionIdx') questionIdx: number,
  ): Promise<GetSurveyResponseOutDto | null> {
    return this.surveyService.getSurveyResponseByQuestionIdx(
      user.idx,
      questionIdx,
    );
  }

  @Post('/response')
  async createSurveyResponse(
    @User() user,
    @Body(new ParseArrayPipe({ items: CreateSurveyResponseDto }))
    createSurveyResponseDto: CreateSurveyResponseDto[],
  ): Promise<void> {
    await this.surveyService.createSurveyResponse(
      user.idx,
      createSurveyResponseDto,
    );
  }

  @Put('/response')
  async updateSurveyResponse(
    @User() user,
    @Body(new ParseArrayPipe({ items: CreateSurveyResponseDto }))
    updateSurveyResponseDto: UpdateSurveyResponseDto[],
  ): Promise<void> {
    await this.surveyService.updateSurveyResponse(
      user.idx,
      updateSurveyResponseDto,
    );
  }

  @Delete('/response/:questionIdx')
  async deleteSurveyResponse(
    @User() user,
    @Param('questionIdx', ParseIntPipe) questionIdx: number,
  ): Promise<void> {
    await this.surveyService.deleteSurveyResponse(user.idx, questionIdx);
  }
}
