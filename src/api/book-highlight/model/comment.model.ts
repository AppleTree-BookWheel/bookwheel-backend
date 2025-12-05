import { SelectComment } from './prisma-type/select-comment';

export class CommentModel {
  idx: number;
  userIdx: number;
  highlightIdx: number;
  bookIdx: number;
  content: string;
  createdAt: Date;

  nickname: string;
  profileImagePath: string | null;

  constructor(data: CommentModel) {
    Object.assign(this, data);
  }

  static fromPrisma(data: SelectComment): CommentModel {
    return new CommentModel({
      idx: data.idx,
      userIdx: data.userIdx,
      highlightIdx: data.highlightIdx,
      bookIdx: data.bookIdx,
      content: data.content,
      createdAt: data.createdAt,

      nickname: data.user.nickname,
      profileImagePath: data.user.profileImagePath,
    });
  }
}
