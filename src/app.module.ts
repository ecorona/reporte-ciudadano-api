import { Ciudadano } from './ciudadanos/entities/ciudadano.entity';
import { CaslForbiddenErrorFilter } from './auth/casl/casl-forbidden-error.filter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CiudadanosModule } from './ciudadanos/ciudadanos.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import * as Joi from 'joi';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt/jwt-auth.guard';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { ReportesModule } from './reportes/reportes.module';
import { RegiduriasModule } from './regidurias/regidurias.module';
import { CallesModule } from './calles/calles.module';
import { ColoniasModule } from './colonias/colonias.module';
import { ComunicadosModule } from './comunicados/comunicados.module';
import { Calle } from './calles/entities/calle.entity';
import { Colonia } from './colonias/entities/colonia.entity';
import { Regiduria } from './regidurias/entities/regiduria.entity';
import { Reporte } from './reportes/entities/reporte.entity';
import { BitacoraReportes } from './reportes/entities/bitacora-reportes.entity';
import { ComentariosReportes } from './reportes/entities/comentarios-reportes.entity';
import { TiposReporte } from './reportes/entities/tipos-reporte.entity';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 20,
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().default(3000),
        JWT_SECRET: Joi.string().required(),
        API_GLOBAL_PREFIX: Joi.string().default('api'),
        MYSQL_USER: Joi.string().default('reporteciudadanouser'),
        MYSQL_PASSWORD: Joi.string().default('password'),
        MYSQL_HOST: Joi.string().default('localhost'),
        MYSQL_PORT: Joi.number().default(3306),
        MYSQL_DATABASE: Joi.string().default('reporteCiudadano'),
      }),
      isGlobal: true,
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_HOST'),
        port: configService.get<number>('MYSQL_PORT'),
        username: configService.get<string>('MYSQL_USER'),
        password: configService.get<string>('MYSQL_PASSWORD'),
        database: configService.get<string>('MYSQL_DATABASE'),
        entities: [
          Ciudadano,
          Calle,
          Colonia,
          Regiduria,
          Reporte,
          TiposReporte,
          BitacoraReportes,
          ComentariosReportes,
          ComunicadosModule,
        ],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    CiudadanosModule,
    AuthModule,
    ReportesModule,
    RegiduriasModule,
    CallesModule,
    ColoniasModule,
    ComunicadosModule,
  ],
  controllers: [],
  providers: [
    //Todas las solicitudes a todas las rutas serán validadas contra
    // un token Jwt en los headers
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    //todas las solicitudes van a validarse contra exceso de tráfico
    //según la configuración de ThrottlerModule
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: CaslForbiddenErrorFilter,
    },
  ],
  exports: [],
})
export class AppModule {}
