import * as bcrypt from 'bcrypt';

/**
 * 입력된 평문 비밀번호와 DB에 저장된 해시값 비교
 */
export async function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * 평문 비밀번호를 안전한 해시 문자열로 변환
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
}
