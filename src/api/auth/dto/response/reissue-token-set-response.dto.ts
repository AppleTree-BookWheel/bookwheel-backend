export class ReissueTokenSetResponseDto {
  /**
   * 새로 발급된 Access Token
   *
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  accessToken: string;

  /**
   * 새로 발급된 Refresh Token
   *
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  refreshToken: string;

  /**
   * Refresh Token 식별자 (UUID v4)
   *
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  refreshTokenId: string;
}
