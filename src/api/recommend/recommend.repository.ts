import { Injectable } from '@nestjs/common';
import axios from 'axios';
@Injectable()
export class RecommendRepository {
  private readonly BASE_URL = process.env.RECOMMEND_API_URL;

  async getHomeRecommend(userIdx: number) {
    const res = await axios.get(`${this.BASE_URL}/home`, {
      headers: { 'X-User-Idx': userIdx },
    });
    return res.data;
  }

  async getSimilarBooksRecommend(bookIdx: number) {
    const res = await axios.get(`${this.BASE_URL}/books/${bookIdx}`);
    return res.data;
  }

  async getSimilarUsersRecommend(userIdx: number) {
    const res = await axios.get(`${this.BASE_URL}/user/${userIdx}`);
    return res.data;
  }
}
