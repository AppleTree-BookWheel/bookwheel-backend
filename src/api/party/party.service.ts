import { BadRequestException, Injectable } from '@nestjs/common';
import { PartyRepository } from './party.repository';
import { CreatePartyInput } from './inputs/create-party.input';
import { PartyOverviewModel } from './model/party-overview.model';
import { PartyModel } from './model/party.model';
import { UpdatePartyInput } from './inputs/update-party.input';
import { PartyMemberStatus } from './constants/party-member-status';
// TODO : party join 메서드 구현
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

  public async joinParty(userIdx: number, partyIdx: number): Promise<void> {
    const party = await this.partyRepository.selectPartyByIdx(partyIdx);
    if (!party) {
      throw new BadRequestException('Party not found.');
    }
    if (party.currentMembers >= party.maxMembers) {
      throw new BadRequestException('Party is full.');
    }

    const existingMember =
      await this.partyRepository.selectPartyMemberByUserAndPartyIdx(
        userIdx,
        partyIdx,
      );

    if (existingMember) {
      if (existingMember.status === PartyMemberStatus.LEFT) {
        throw new BadRequestException('User has left the party before.');
      }
      throw new BadRequestException('User is already a member of the party.');
    }

    await this.partyRepository.insertPartyMember(userIdx, partyIdx);
  }

  public async getPartyOverviews(): Promise<PartyOverviewModel[]> {
    const response = await this.partyRepository.selectPartyOverviews();

    return response.map((data) => PartyOverviewModel.fromPrisma(data));
  }

  public async getPartyOverviewByKeyword(
    keyword: string,
  ): Promise<PartyOverviewModel[]> {
    const response =
      await this.partyRepository.selectPartyOverviewByKeyword(keyword);

    return response.map((data) => PartyOverviewModel.fromPrisma(data));
  }

  public async getPartyByIdx(partyIdx: number): Promise<PartyModel | null> {
    const party = await this.partyRepository.selectPartyByIdx(partyIdx);
    if (!party) {
      return null;
    }
    return PartyModel.fromPrisma(party);
  }

  public async getHostedPartyByUserIdx(
    userIdx: number,
  ): Promise<PartyOverviewModel[]> {
    const response =
      await this.partyRepository.selectHostedPartyByUserIdx(userIdx);

    return response.map((data) => PartyOverviewModel.fromPrisma(data));
  }

  public async getJoinedPartyByUserIdx(
    userIdx: number,
  ): Promise<PartyOverviewModel[]> {
    const response =
      await this.partyRepository.selectJoinedPartyByUserIdx(userIdx);

    return response.map((data) => PartyOverviewModel.fromPrisma(data));
  }

  public async updatePartyByUserAndPartyIdx(
    userIdx: number,
    input: UpdatePartyInput,
  ): Promise<void> {
    const party = await this.partyRepository.selectPartyByIdx(input.partyIdx);
    if (!party) {
      throw new BadRequestException('Party not found.');
    }
    if (party.hostUserIdx !== userIdx) {
      throw new BadRequestException('Only the host can update the party.');
    }

    if (input.maxMembers && input.maxMembers < party.currentMembers) {
      throw new BadRequestException(
        `Max members cannot be less than current members (${party.currentMembers}).`,
      );
    }

    await this.partyRepository.updatePartyByUserAndPartyIdx(userIdx, input);
  }
}
