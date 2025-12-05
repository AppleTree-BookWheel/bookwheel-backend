import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PartyService } from './party.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePartyDto } from './dto/request/create-party.dto';
import { User } from 'src/common/decorators/user.decorator';

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
}
