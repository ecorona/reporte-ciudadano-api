import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SyslogService } from './syslog.service';
import * as moment from 'moment';
import { Reflector } from '@nestjs/core';
import { SyslogMetaData } from './syslog-include.decorator';
import { ConfigKeys } from '../app.config-keys';
import { SyslogEntity } from './syslog.entity';
import { SYSLOG_INCLUDE_METADATA_KEY } from './constants';
import { Ciudadano } from '@root/ciudadanos/entities/ciudadano.entity';
import { Request, Response } from 'express';
/**
 * Intercepta todas las solicitudes que se hacen al sistema y se cuelga de la salida para generar
 * los logs del sistema.
 */
@Injectable()
export class SyslogInterceptor implements NestInterceptor {
  requestLogger = new Logger(SyslogInterceptor.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly syslogService: SyslogService,
    private readonly reflector: Reflector,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    //primero verificamos si esta configurado para estar activo.
    if (!this.configService.get<boolean>(ConfigKeys.ENABLE_SYSLOG)) {
      return next.handle();
    }

    // obtener a la entrada para calcular el response-time
    const ahora = Date.now();

    //obtener la configuración de syslog para esta ruta
    //decorada
    const syslogMetadata = this.reflector.get<{
      event: string;
      meta: SyslogMetaData;
    }>(
      SYSLOG_INCLUDE_METADATA_KEY, //metadatos inyectados por el decorador @SyslogInclude a nivel metodo
      context.getHandler(), //metodo de clase
    );

    //si no se decoró este metodo de controller, no hacer nada.
    if (!syslogMetadata) {
      return next.handle();
    }

    //extraemos req y res del contexto(http)
    const req: Request & { user: Ciudadano } = context
      .switchToHttp()
      .getRequest();
    const res: Response = context.switchToHttp().getResponse();
    const { ip, method } = req;
    const originalUrl: string = req.originalUrl;
    //y nos colgamos al final
    return next.handle().pipe(
      tap(async (responseData) => {
        const resData = { ...responseData };
        const body = req.body;
        const userAgent: string = req.get('user-agent') || '';
        const { statusCode } = res;
        const date = moment().format();
        const contentLength = Buffer.byteLength(JSON.stringify(resData));
        const responseTime = `${Date.now() - ahora}ms`;
        const referrer = req.headers.referer;
        const params = req.params;
        const query = req.query;
        //extraer un ciudadano de la solicitud, si es que existe
        //puesto ahí por passport al validar al ciudadano con el JwtStrategy
        const ciudadano: Ciudadano = req['user'] ? req['user'] : null;

        //borrar datos sensibles
        delete body.password;
        delete resData.access_token;
        delete resData.accessToken;
        delete resData.jwt;
        //...etc

        const log = new SyslogEntity();
        //dependiendo de lo que el usuario haya decidido decorar...

        log.ip = syslogMetadata.meta.ip ? ip : undefined;
        //Aquí podriamos guardar el cudadano también si es que viene en el request.user
        log.ciudadanoId =
          syslogMetadata.meta.ciudadano && ciudadano?.id
            ? ciudadano.id
            : undefined;
        log.userAgent = syslogMetadata.meta.userAgent
          ? userAgent.substring(0, 250)
          : undefined;
        log.body = syslogMetadata.meta.body && body ? body : undefined;
        log.baseUrl = syslogMetadata.meta.url ? originalUrl : undefined;
        log.responseData =
          syslogMetadata.meta.response && resData ? resData : undefined;
        log.params = syslogMetadata.meta.params && params ? params : undefined;

        log.query = syslogMetadata.meta.query && query ? query : undefined;

        //los que se van por defecto, es decir no son configurables.
        log.statusCode = res.statusCode;
        log.contentLength = contentLength;
        log.referrer = referrer;
        log.responseTime = responseTime;
        log.method = method;
        log.eventName = syslogMetadata.event.substring(0, 250);

        //almacenar el log en la base de datos.
        this.syslogService.storeLog(log);

        //mostrar en terminal
        const ciudadanoLog = ciudadano?.email ? `${ciudadano.email} ` : '';
        this.requestLogger.log(
          `${ip} ${date} ${ciudadanoLog}${method} ${statusCode} ${originalUrl} ${responseTime} ${userAgent}`,
        );
      }),
    );
  }
}
