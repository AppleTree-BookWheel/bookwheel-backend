import { SelectPartyMember } from './prisma-type/select-party-member';

export class PartyMemberModel {
  partyIdx: number;
  userIdx: number;
  status: string;

  nickname: string;
  profileImagePath: string | null;

  constructor(data: PartyMemberModel) {
    Object.assign(this, data);
  }

  static fromPrisma(data: SelectPartyMember): PartyMemberModel {
    return new PartyMemberModel({
      partyIdx: data.partyIdx,
      userIdx: data.userIdx,
      status: data.status,

      nickname: data.user.nickname,
      profileImagePath: data.user.profileImagePath,
    });
  }
}
