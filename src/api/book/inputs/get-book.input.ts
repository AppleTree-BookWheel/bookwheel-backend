export class GetBookInput {
  idx: number;
  title: string;
  author: string;
  publisher?: string;
  publicationYear?: number;
  description?: string;
  bookFilePath: string;
  coverImagePath: string;
  averageRating: number = 0;
  ratingsCount: number = 0;
  languageCode?: string;
  isbn13?: string;
  koreanTitle?: string;
  koreanAuthor?: string;
  koreanCoverPath?: string;
}
