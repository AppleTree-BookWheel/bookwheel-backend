import { BadRequestException, Injectable } from '@nestjs/common';
import { PartyRepository } from './party.repository';
import { CreatePartyInput } from './inputs/create-party.input';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { PartyOverviewModel } from './model/party-overview.model';
import { PartyModel } from './model/party.model';

@Injectable()
export class PartyService {
  constructor(private readonly partyRepository: PartyRepository) {}

  public async createParty(
    hostUserIdx: number,
    input: CreatePartyInput,
  ): Promise<void> {
    const { invitedUserIdxs, ...partyData } = input;

    if (partyData.isPrivate && !partyData.password) {
      throw new BadRequestException(
        'Password is required for private parties.',
      );
    }

    await this.partyRepository.insertParty(hostUserIdx, partyData);

    if (invitedUserIdxs && invitedUserIdxs.length > 0) {
      // TODO : 유저 초대 message 기능 추가 예정
    }
  }

  public async getPartyOverviews(): Promise<PartyOverviewModel[]> {
    const response = await this.partyRepository.selectPartyOverviews();

    return response.map((data) => PartyOverviewModel.fromPrisma(data));
  }

  public async getPartyByIdx(partyIdx: number): Promise<PartyModel | null> {
    const party = await this.partyRepository.selectPartyByIdx(partyIdx);
    if (!party) {
      return null;
    }
    return PartyModel.fromPrisma(party);
  }
}
