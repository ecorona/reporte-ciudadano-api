import { Ciudadano } from '../../ciudadanos/entities/ciudadano.entity';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Rol } from './rol.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Rol[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request: Request & { ciudadano: Ciudadano } = context
      .switchToHttp()
      .getRequest();
    const ciudadano: Ciudadano = request.ciudadano;
    return requiredRoles.some((role) => ciudadano.roles?.includes(role));
  }
}
