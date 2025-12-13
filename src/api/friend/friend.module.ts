import { Module } from '@nestjs/common';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';
import { FriendRepository } from './friend.repository';

@Module({
  controllers: [FriendController],
  providers: [FriendService, FriendRepository],
})
export class FriendModule {}
