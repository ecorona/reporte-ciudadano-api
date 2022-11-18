import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Ciudadano } from '../../ciudadanos/entities/ciudadano.entity';
/**
 * El objetivo de este decorador es para obtener el ciudadano que
 * se encuentra en el req, (puesto ahi por passport) una vez que
 * es autenticado su token, se usa a nivel método de controller.
 */
export const SesionCiudadano = createParamDecorator(
  (data: any, ctx: ExecutionContext): Ciudadano => {
    const req = ctx.switchToHttp().getRequest();
    return req.user?.id ? req.user : null;
  },
);
