import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { FriendService } from './friend.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Post('/request/:receiveUserIdx')
  public async createFriendRequest(
    @User() user,
    @Param('receiveUserIdx') receiveUserIdx: number,
  ): Promise<void> {
    await this.friendService.createFriendRequest(user.idx, receiveUserIdx);
  }
}
