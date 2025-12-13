import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { HomeResponseInterface } from './interface/home-response.interface';
import { BookListResponseInterface } from './interface/book-list-response.interface';
import { UserListResponseInterface } from './interface/user-list-response.interface';
@Injectable()
export class RecommendRepository {
  private readonly BASE_URL = process.env.RECOMMEND_API_URL;

  async getHomeRecommend(userIdx: number): Promise<HomeResponseInterface> {
    const res = await axios.get<HomeResponseInterface>(
      `${this.BASE_URL}/home`,
      {
        headers: { 'X-User-Idx': userIdx },
      },
    );
    return res.data;
  }

  async getSimilarBooksRecommend(
    bookIdx: number,
  ): Promise<BookListResponseInterface> {
    const res = await axios.post(
      `${this.BASE_URL}/books/${bookIdx}`,
      { idx: bookIdx },
      { headers: { 'Content-Type': 'application/json' } },
    );
    return res.data;
  }

  async getSimilarUsersRecommend(
    userIdx: number,
  ): Promise<UserListResponseInterface> {
    const res = await axios.get(`${this.BASE_URL}/users/${userIdx}`);
    return res.data;
  }
}
