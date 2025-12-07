import { Module } from '@nestjs/common';
import { RecommendService } from './recommend.service';
import { RecommendController } from './recommend.controller';
import { RecommendRepository } from './recommend.repository';
import { BookModule } from '../book/book.module';

@Module({
  imports: [BookModule],
  controllers: [RecommendController],
  providers: [RecommendService, RecommendRepository],
})
export class RecommendModule {}
