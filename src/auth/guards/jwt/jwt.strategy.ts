import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { JwtPayloadDTO } from '../../../auth/dto/jwt-payload.dto';
import { CiudadanoRepository } from '../../../ciudadanos/ciudadanos.repository';
import { Ciudadano } from '../../../ciudadanos/entities/ciudadano.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly ciudadanoRepository: CiudadanoRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
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
