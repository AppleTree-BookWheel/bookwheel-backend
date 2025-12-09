import { BookItemInterface } from './book-item.interface';
import { GenreSectionInterface } from './genre-section.interface';
import { RecentSectionInterface } from './recent-section.interface';

export interface HomeResponseInterface {
  top1: BookItemInterface | null;
  top10: BookItemInterface[];
  recentTop10: RecentSectionInterface[];
  popularTop10: BookItemInterface[];
  genreSectionList: GenreSectionInterface[];
}
