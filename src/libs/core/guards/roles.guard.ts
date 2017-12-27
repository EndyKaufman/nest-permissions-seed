import { CanActivate, ExecutionContext, Guard } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { plainToClass } from 'class-transformer';
import { IncomingMessage } from 'http';

import { User } from '../entites/user.entity';
import { TokenService } from '../services/token.service';

@Guard()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly tokenService: TokenService
    ) { }

    canActivate(req: IncomingMessage, context: ExecutionContext): boolean {
        const { parent, handler } = context;
        if (
            req.headers['authorization'] &&
            String(req.headers['authorization']).indexOf(process.env.JWT_AUTH_HEADER_PREFIX) === 0
        ) {
            let token =
                process.env.JWT_AUTH_HEADER_PREFIX ?
                    String(req.headers['authorization']).split(process.env.JWT_AUTH_HEADER_PREFIX)[1] :
                    String(req.headers['authorization']);
            token = token.trim();
            if (token && this.tokenService.verify(token)) {
                let user = this.tokenService.decode(token);
                req['user'] = plainToClass(User, user);
            }
        }
        const roles = this.reflector.get<string[]>('roles', handler);
        if (!roles) {
            return true;
        }
        const hasRole = roles.filter(roleName => req['user'] && req['user'][roleName]).length > 0;
        return req['user'] && hasRole;
    }
}