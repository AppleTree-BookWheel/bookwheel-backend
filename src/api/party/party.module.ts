import { Module } from '@nestjs/common';
import { PartyController } from './party.controller';
import { PartyService } from './party.service';
import { PartyRepository } from './party.repository';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [MessageModule],
  controllers: [PartyController],
  providers: [PartyService, PartyRepository],
})
export class PartyModule {}
