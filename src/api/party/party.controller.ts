import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PartyService } from './party.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePartyDto } from './dto/request/create-party.dto';
import { User } from 'src/common/decorators/user.decorator';
import { GetPartyOverviewResponseDto } from './dto/response/get-party-overview-response.dto';
import { GetPartyResponseDto } from './dto/response/get-party-response.dto';
import { UpdatePartyDto } from './dto/request/update-party.dto';
import { GetPartyMemberResponseDto } from './dto/response/get-party-member-response.dto';
import { JoinPartyDto } from './dto/request/join-party.dto';
import { UpdatePartyBookProgressInput } from './inputs/update-party-book-progress.input';

@UseGuards(JwtAuthGuard)
@Controller('party')
export class PartyController {
  constructor(private readonly partyService: PartyService) {}

  @Post()
  // 파티 생성(파티글 작성)
  public async createParty(
    @User() user,
    @Body() createPartyDto: CreatePartyDto,
  ): Promise<void> {
    await this.partyService.createParty(user.idx, createPartyDto);
  }

  @Post('/join')
  // 파티 가입 (PartyMembers에 유저 추가)
  public async joinParty(
    @User() user,
    @Body() dto: JoinPartyDto,
  ): Promise<void> {
    await this.partyService.joinParty(user.idx, dto);
  }

  @Get('/overviews')
  // 파티찾기 -> 전체 파티 (오버뷰))
  public async getPartyOverviews(): Promise<GetPartyOverviewResponseDto[]> {
    return await this.partyService.getPartyOverviews();
  }

  @Post('/search')
  // 파티 검색 (키워드로 오버뷰 조회)
  public async getPartyOverviewByKeyword(
    @Body('keyword') keyword: string,
  ): Promise<GetPartyOverviewResponseDto[]> {
    return await this.partyService.getPartyOverviewByKeyword(keyword);
  }

  @Post('/detail')
  // 파티 상세 조회
  public async getPartyByIdx(
    @Body('partyIdx') partyIdx: number,
  ): Promise<GetPartyResponseDto | null> {
    return await this.partyService.getPartyByIdx(partyIdx);
  }

  @Post('/hosted')
  // 참여중파티 -> 내가 관리하는 파티
  public async getHostedPartyByUserIdx(
    @User() user,
  ): Promise<GetPartyOverviewResponseDto[]> {
    return await this.partyService.getHostedPartyByUserIdx(user.idx);
  }

  @Post('/joined')
  // 참여중파티 -> 전체파티
  public async getJoinedPartyByUserIdx(
    @User() user,
  ): Promise<GetPartyOverviewResponseDto[]> {
    return await this.partyService.getJoinedPartyByUserIdx(user.idx);
  }

  @Post('/members')
  // 파티 멤버 조회
  public async getPartyMembersByIdx(
    @Body('partyIdx') partyIdx: number,
  ): Promise<GetPartyMemberResponseDto[]> {
    return await this.partyService.getPartyMembersByIdx(partyIdx);
  }

  @Patch()
  // 파티 수정
  public async updatePartyByUserAndPartyIdx(
    @User() user,
    @Body() updatePartyDto: UpdatePartyDto,
  ): Promise<void> {
    await this.partyService.updatePartyByUserAndPartyIdx(
      user.idx,
      updatePartyDto,
    );
  }

  @Patch('/book-progress')
  // 파티 도서 진행도 수정(생성 및 업데이트)
  public async updatePartyBookProgressByUserAndPartyIdx(
    @User() user,
    @Body() dto: UpdatePartyBookProgressInput,
  ): Promise<void> {
    await this.partyService.updatePartyBookProgressByUserAndPartyIdx(
      user.idx,
      dto,
    );
  }

  @Delete('/:partyIdx')
  // 파티글 삭제
  public async deletePartyByUserAndPartyIdx(
    @User() user,
    @Param('partyIdx', ParseIntPipe) partyIdx: number,
  ): Promise<void> {
    await this.partyService.deletePartyByUserAndPartyIdx(user.idx, partyIdx);
  }

  @Delete('/leave/:partyIdx')
  // 파티 탈퇴
  public async leaveParty(
    @User() user,
    @Param('partyIdx', ParseIntPipe) partyIdx: number,
  ): Promise<void> {
    await this.partyService.leaveParty(user.idx, partyIdx);
  }
}
