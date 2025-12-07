import { Inject, Injectable } from '@nestjs/common';
import { RecommendRepository } from './recommend.repository';

@Injectable()
export class RecommendService {
  constructor(private readonly recommendRepository: RecommendRepository) {}
}
