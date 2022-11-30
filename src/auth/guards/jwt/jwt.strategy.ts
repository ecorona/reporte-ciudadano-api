import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigKeys } from '@root/app.config-keys';
import { JwtPayloadDTO } from '@root/auth/dto/jwt-payload.dto';
import { CiudadanoRepository } from '@root/ciudadanos/ciudadanos.repository';
import { Ciudadano } from '@root/ciudadanos/entities/ciudadano.entity';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly ciudadanoRepository: CiudadanoRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(ConfigKeys.JWT_SECRET),
    });
  }

  async validate(payload: JwtPayloadDTO): Promise<Ciudadano> {
    const ciudadanoEnPayload = await this.ciudadanoRepository.findOne({
      where: { id: payload.sub },
    });

    if (ciudadanoEnPayload?.id) {
      return ciudadanoEnPayload;
    }

    throw new HttpException('Token inválido', HttpStatus.UNAUTHORIZED);
  }
}
