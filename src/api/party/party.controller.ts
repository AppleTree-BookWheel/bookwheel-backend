import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { PartyService } from './party.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePartyDto } from './dto/request/create-party.dto';
import { User } from 'src/common/decorators/user.decorator';
import { GetPartyOverviewResponseDto } from './dto/response/get-party-overview-response.dto';
import { GetPartyResponseDto } from './dto/response/get-party-response.dto';
import { UpdatePartyDto } from './dto/request/update-party.dto';

@UseGuards(JwtAuthGuard)
@Controller('party')
export class PartyController {
  constructor(private readonly partyService: PartyService) {}

  @Post()
  public async createParty(
    @User() user,
    @Body() createPartyDto: CreatePartyDto,
  ): Promise<void> {
    await this.partyService.createParty(user.idx, createPartyDto);
  }

  @Get('/overviews')
  public async getPartyOverviews(): Promise<GetPartyOverviewResponseDto[]> {
    return await this.partyService.getPartyOverviews();
  }

  @Post('/detail')
  public async getPartyByIdx(
    @Body('partyIdx') partyIdx: number,
  ): Promise<GetPartyResponseDto | null> {
    return await this.partyService.getPartyByIdx(partyIdx);
  }

  @Post('/hosted')
  public async getHostedPartyByUserIdx(
    @User() user,
  ): Promise<GetPartyOverviewResponseDto[]> {
    return await this.partyService.getHostedPartyByUserIdx(user.idx);
  }

  @Post('/joined')
  public async getJoinedPartyByUserIdx(
    @User() user,
  ): Promise<GetPartyOverviewResponseDto[]> {
    return await this.partyService.getJoinedPartyByUserIdx(user.idx);
  }

  @Patch()
  public async updatePartyByUserAndPartyIdx(
    @User() user,
    @Body() updatePartyDto: UpdatePartyDto,
  ): Promise<void> {
    await this.partyService.updatePartyByUserAndPartyIdx(
      user.idx,
      updatePartyDto,
    );
  }
}
