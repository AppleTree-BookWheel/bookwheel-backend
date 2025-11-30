import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

/*
    AdminKeyGuard는 요청 헤더에 포함된 'x-admin-key' 값을 확인하여
    관리자 권한을 검증하는 가드입니다. 
*/

@Injectable()
export class AdminKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const key = request.headers['x-admin-key'];
    const secret = process.env.ADMIN_SECRET_KEY;

    if (!key || key !== secret) {
      throw new UnauthorizedException(
        '관리자 비밀 키가 틀렸거나 비밀 키가 필요합니다. (Invalid Admin Key).',
      );
    }

    return true;
  }
}
