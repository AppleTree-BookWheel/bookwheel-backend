import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyController } from './survey.controller';
import { SurveyRepository } from './survey.repository';

@Module({
  controllers: [SurveyController],
  providers: [SurveyService, SurveyRepository],
})
export class SurveyModule {}
