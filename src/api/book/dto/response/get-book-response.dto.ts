export class GetBookResponseDto {
  idx: number;
  title: string;
  author: string;
  coverImagePath: string;
  averageRating: number;
  ratingsCount: number;
  createdAt: Date;

  koreanTitle?: string | null;
  koreanAuthor?: string | null;
  koreanCoverPath?: string | null;
  languageCode?: string | null;
  isbn13?: string | null;
  publisher?: string | null;
  publicationYear?: number | null;
  description?: string | null;

  bookFilePath: string;
}
