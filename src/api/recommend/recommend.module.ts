import { Module } from '@nestjs/common';
import { RecommendService } from './recommend.service';
import { RecommendController } from './recommend.controller';
import { RecommendRepository } from './recommend.repository';

@Module({
  controllers: [RecommendController],
  providers: [RecommendService, RecommendRepository],
})
export class RecommendModule {}
