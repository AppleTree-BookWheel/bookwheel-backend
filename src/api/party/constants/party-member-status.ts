/**
 * 파티 멤버 상태를 나타내는 enum
 * - INVITED: 초대받음 (수락 대기 상태)
 * - ACCEPTED: 초대 수락 (초대를 받지 않고 직접 가입한 경우도 포함)
 * - REJECTED: 초대 거절
 * - LEFT: 파티 나가기 (탈퇴)
 */
export enum PartyMemberStatus {
  INVITED = 'INVITED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  LEFT = 'LEFT',
}
