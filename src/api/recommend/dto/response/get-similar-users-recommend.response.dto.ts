import { GetPublicUserResponseDto } from 'src/api/user/dto/response/get-public-user-response.dto';

export class GetSimilarBooksRecommendResponseDto {
  user_list: GetPublicUserResponseDto[];
}
