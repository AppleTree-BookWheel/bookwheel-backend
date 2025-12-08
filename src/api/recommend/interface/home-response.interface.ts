import { BookItemInterface } from './book-item.interface';
import { GenreSectionInterface } from './genre-section.interface';

export interface HomeResponseInterface {
  top1: BookItemInterface | null;
  top10: BookItemInterface[];
  recentTop10: BookItemInterface[];
  popularTop10: BookItemInterface[];
  genreSectionList: GenreSectionInterface[];
}
