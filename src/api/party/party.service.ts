import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PartyRepository } from './party.repository';
import { CreatePartyInput } from './inputs/create-party.input';
import { PartyOverviewModel } from './model/party-overview.model';
import { PartyModel } from './model/party.model';
import { UpdatePartyInput } from './inputs/update-party.input';
import { PartyMemberStatus } from './constants/party-member-status';
import { PartyMemberModel } from './model/party-member.model';
import { JoinPartyInput } from './inputs/join-party.input';
import { UpdatePartyBookProgressInput } from './inputs/update-party-book-progress.input';
import { PartyBookProgressModel } from './model/party-book-progress.model';
import { MessageService } from '../message/message.service';
import { KickPartyMembersInput } from './inputs/kick-party-members.input';
import * as HashUtil from '../../utils/hash.util';
@Injectable()
export class PartyService {
  constructor(
    private readonly partyRepository: PartyRepository,
    private readonly messageService: MessageService,
  ) {}

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

    const hashedPassword = partyData.password
      ? await HashUtil.hashPassword(partyData.password)
      : undefined;

    const party = await this.partyRepository.insertParty(hostUserIdx, {
      ...partyData,
      password: hashedPassword,
    });

    if (invitedUserIdxs && invitedUserIdxs.length > 0) {
      const inviteData = {
        type: 'INVITE',
        partyIdx: party.idx,
        partyTitle: party.title,
        content: `'${party.title}' 파티에 초대되었습니다.`,
      };

      const messageContent = JSON.stringify(inviteData);

      const messagePromises = invitedUserIdxs.map((receiverIdx) =>
        this.messageService.createMessage(hostUserIdx, {
          receiverIdx,
          content: messageContent,
        }),
      );

      await Promise.all(messagePromises);
    }
  }

  public async joinParty(
    userIdx: number,
    input: JoinPartyInput,
  ): Promise<void> {
    const { partyIdx, password } = input;

    const party = await this.partyRepository.selectPartyByIdx(partyIdx);
    if (!party) {
      throw new NotFoundException('Party not found.');
    }

    if (party.isPrivate) {
      if (!password) {
        throw new BadRequestException(
          'Password is required to join private party.',
        );
      }

      const savedPassword =
        await this.partyRepository.selectPartyPasswordByIdx(partyIdx);

      if (!savedPassword) {
        throw new ForbiddenException('Incorrect password for private party.');
      }

      const isPasswordValid = await HashUtil.comparePassword(
        password,
        savedPassword,
      );

      if (!isPasswordValid) {
        throw new ForbiddenException('Incorrect password for private party.');
      }
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

  public async getPartyMembersByIdx(
    partyIdx: number,
  ): Promise<PartyMemberModel[]> {
    const response =
      await this.partyRepository.selectPartyMembersByIdx(partyIdx);

    return response.map((data) => PartyMemberModel.fromPrisma(data));
  }

  public async updatePartyByUserAndPartyIdx(
    userIdx: number,
    input: UpdatePartyInput,
  ): Promise<void> {
    const party = await this.partyRepository.selectPartyByIdx(input.partyIdx);
    if (!party) {
      throw new NotFoundException('Party not found.');
    }
    if (party.hostUserIdx !== userIdx) {
      throw new ForbiddenException('Only the host can update the party.');
    }

    if (input.maxMembers && input.maxMembers < party.currentMembers) {
      throw new BadRequestException(
        `Max members cannot be less than current members (${party.currentMembers}).`,
      );
    }

    const hashedPassword = input.password
      ? await HashUtil.hashPassword(input.password)
      : undefined;

    await this.partyRepository.updatePartyByUserAndPartyIdx(userIdx, {
      ...input,
      password: hashedPassword,
    });
  }

  public async updatePartyBookProgressByUserAndPartyIdx(
    userIdx: number,
    input: UpdatePartyBookProgressInput,
  ): Promise<void> {
    const member =
      await this.partyRepository.selectPartyMemberByUserAndPartyIdx(
        userIdx,
        input.partyIdx,
      );
    if (!member || member.status === PartyMemberStatus.LEFT) {
      throw new BadRequestException('User is not a member of the party.');
    }

    await this.partyRepository.upsertPartyBookProgressByUserAndPartyIdx(
      userIdx,
      input,
    );
  }

  public async getPartyBookProgressByUserAndPartyIdx(
    userIdx: number,
    partyIdx: number,
  ): Promise<PartyBookProgressModel | null> {
    const response =
      await this.partyRepository.selectPartyBookProgressByUserAndPartyIdx(
        userIdx,
        partyIdx,
      );
    if (!response) {
      return null;
    }
    return PartyBookProgressModel.fromPrisma(response);
  }

  public async deletePartyByUserAndPartyIdx(
    userIdx: number,
    partyIdx: number,
  ): Promise<void> {
    const party = await this.partyRepository.selectPartyByIdx(partyIdx);
    if (!party) {
      throw new NotFoundException('Party not found.');
    }
    if (party.hostUserIdx !== userIdx) {
      throw new ForbiddenException('Only the host can delete the party.');
    }

    await this.partyRepository.deletePartyByUserAndPartyIdx(userIdx, partyIdx);
  }

  public async leaveParty(userIdx: number, partyIdx: number): Promise<void> {
    const party = await this.partyRepository.selectPartyByIdx(partyIdx);
    if (!party) {
      throw new NotFoundException('Party not found.');
    }

    const member =
      await this.partyRepository.selectPartyMemberByUserAndPartyIdx(
        userIdx,
        partyIdx,
      );
    if (!member || member.status === PartyMemberStatus.LEFT) {
      throw new BadRequestException('User is not a member of the party.');
    }

    await this.partyRepository.deletePartyMemberByUserAndPartyIdx(
      userIdx,
      partyIdx,
    );
  }

  public async kickPartyMembers(
    userIdx: number,
    input: KickPartyMembersInput,
  ): Promise<void> {
    const party = await this.partyRepository.selectPartyByIdx(input.partyIdx);
    if (!party) {
      throw new NotFoundException('Party not found.');
    }

    if (party.hostUserIdx !== userIdx) {
      throw new ForbiddenException('Only the host can kick party members.');
    }

    if (input.memberUserIdxs.includes(userIdx)) {
      throw new BadRequestException('Host cannot kick yourself.');
    }

    await this.partyRepository.deletePartyMembersByMemberAndPartyIdx(
      input.memberUserIdxs,
      input.partyIdx,
    );
  }
}
