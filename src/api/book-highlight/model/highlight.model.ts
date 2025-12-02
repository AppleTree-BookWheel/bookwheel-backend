import { SelectHighlight } from './prisma-type/select-highlight';

export class HighlightModel {
  /**
   * 하이라이트 고유 식별자 (PK)
   *
   * @example 1
   */
  idx: number;

  /**
   * 작성자 식별자
   *
   * @example 10
   */
  userIdx: number;

  /**
   * 파티 식별자
   *
   * @example 5
   */
  partyIdx: number;

  /**
   * 전자책 내 하이라이트 위치 정보 (CFI)
   *
   * @example "epubcfi(/6/4[chap01ref]!/4/2/1:0)"
   */
  cfiRange: string;

  /**
   * 하이라이트 색상 코드
   *
   * @example "#FF5733"
   */
  colorCode: string;

  /**
   * 생성 일시 (정렬용)
   *
   * @example "2023-10-25T12:00:00.000Z"
   */
  createdAt: Date;

  constructor(data: HighlightModel) {
    Object.assign(this, data);
  }

  /**
   * Prisma 조회 결과(Payload)를 도메인 모델로 변환
   */
  static fromPrisma(data: SelectHighlight): HighlightModel {
    return new HighlightModel({
      idx: data.idx,
      userIdx: data.userIdx,
      partyIdx: data.partyIdx,
      cfiRange: data.cfiRange,
      colorCode: data.colorCode,
      createdAt: data.createdAt,
    });
  }
}
