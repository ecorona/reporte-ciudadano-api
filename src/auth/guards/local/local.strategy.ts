import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../../../auth/auth.service';
import { Request } from 'express';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { Ciudadano } from '../../../ciudadanos/entities/ciudadano.entity';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private moduleRef: ModuleRef) {
    super({
      usernameField: 'email',
      passReqToCallback: true,
    });
  }

  async validate(
    request: Request,
    username: string,
    password: string,
  ): Promise<Ciudadano> {
    const contextId = ContextIdFactory.getByRequest(request);
    const authService = await this.moduleRef.resolve(AuthService, contextId);
    return authService.validarLoginCiudadano(username, password);
  }
}
