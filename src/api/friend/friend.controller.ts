import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { FriendService } from './friend.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { FriendOverviewModel } from './model/friend-overview.model';
import { GetFriendOverviewResponseDto } from './dto/response/get-friend-overview-response.dto';

@UseGuards(JwtAuthGuard)
@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  // 친구 요청 보내기
  @Post('/request/:receiveUserIdx')
  public async createFriendRequest(
    @User() user,
    @Param('receiveUserIdx') receiveUserIdx: number,
  ): Promise<void> {
    await this.friendService.createFriendRequest(user.idx, receiveUserIdx);
  }

  // 받은 친구 요청 목록 조회
  @Get('/requests')
  public async getReceivedFriendRequestsByUserIdx(
    @User() user,
  ): Promise<GetFriendOverviewResponseDto[]> {
    return this.friendService.getReceivedFriendRequestsByUserIdx(user.idx);
  }

  // 친구 목록 조회
  @Get('')
  public async getFriendsByUserIdx(
    @User() user,
  ): Promise<GetFriendOverviewResponseDto[]> {
    return this.friendService.getFriendsByUserIdx(user.idx);
  }
}
