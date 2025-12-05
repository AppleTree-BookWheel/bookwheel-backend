import { Module } from '@nestjs/common';
import { BookHighlightController } from './book-highlight.controller';
import { BookHighlightService } from './book-highlight.service';
import { BookHighlightRepository } from './book-highlight.repository';

@Module({
  controllers: [BookHighlightController],
  providers: [BookHighlightService, BookHighlightRepository],
})
export class BookHighlightModule {}
