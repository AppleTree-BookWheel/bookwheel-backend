import { Module } from '@nestjs/common';
import { BookHighlightController } from './book-highlight.controller';
import { BookHighlightService } from './book-highlight.service';

@Module({
  controllers: [BookHighlightController],
  providers: [BookHighlightService]
})
export class BookHighlightModule {}
