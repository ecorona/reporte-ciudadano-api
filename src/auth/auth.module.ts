import { CiudadanosModule } from './../ciudadanos/ciudadanos.module';
import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './guards/local/local.strategy';
import { JwtStrategy } from './guards/jwt/jwt.strategy';
import { CaslModule } from './casl/casl.module';
@Global()
@Module({
  imports: [
    CiudadanosModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '8h' },
      }),
      inject: [ConfigService],
    }),
    CaslModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
