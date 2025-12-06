import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PartyService } from './party.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePartyDto } from './dto/request/create-party.dto';
import { User } from 'src/common/decorators/user.decorator';
import { GetPartyOverviewResponseDto } from './dto/response/get-party-overview-response.dto';

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
}
