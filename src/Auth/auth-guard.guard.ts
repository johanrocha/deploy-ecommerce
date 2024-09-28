import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    //return validateRequest(request);

    // debenos recibir por headres el token
    const token = request.headers.authorization?.split(' ')[1]; //bearer xxxxx
    if (!token) throw new UnauthorizedException('token required');

    try {
      // valid token
      const secret = process.env.JWT_TOKEN;
      const payload = this.jwtService.verify(token, { secret });

      payload.exp = new Date(payload.exp * 1000);
      payload.iat = new Date(payload.iat * 1000);

      if (payload.isAdmin) {
        payload.roles = ['admin'];
      } else {
        payload.roles = ['user'];
      }
      request.user = payload;
      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException('invalid token');
    }
  }
}
/*
function validateRequest(request) {
  const authHeader = request.headers.authorization; //Basic

  if (!authHeader) return false;
  const [email, password] = authHeader.split(':');

  if (!email || !password) return false;

  return true;
}
*/
