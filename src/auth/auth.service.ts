import { Ciudadano } from './../ciudadanos/entities/ciudadano.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginCiudadanoResponse } from './dto/login-ciudadano-response.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadDTO } from './dto/jwt-payload.dto';
import { CiudadanosService } from '../ciudadanos/ciudadanos.service';
import { ConfigService } from '@nestjs/config';

/**
 * Servicio para la autenticación de ciudadanos
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly ciudadanoService: CiudadanosService,
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {}
  /**
   * Método para validar credenciales de un ciudadano
   *
   * @param email email del ciudadano
   * @param password contraseña del ciudadano
   * @returns ciudadano autenticado
   */
  async validarLoginCiudadano(
    email: string,
    password: string,
  ): Promise<Ciudadano> {
    const ciudadanoEntrando = await this.ciudadanoService.getByEmail(
      email.toLowerCase(),
    );
    if (!ciudadanoEntrando) {
      throw new UnauthorizedException();
    }
    const passwordMatch = await this.ciudadanoService.validarPassword(
      password,
      ciudadanoEntrando.password,
    );
    if (!passwordMatch) {
      return null;
    }
    return ciudadanoEntrando;
  }

  /**
   * Método para generar el token jwt
   *
   * @param ciudadano ciudadano que se va a autenticar
   * @param recuerdame si el ciudadano quiere que se le recuerde
   * @returns token jwt
   */
  async login(
    ciudadano: Ciudadano,
    recuerdame: boolean,
  ): Promise<LoginCiudadanoResponse> {
    const tokenPayload: JwtPayloadDTO = {
      sub: ciudadano.id,
      email: ciudadano.email,
    };
    return {
      access_token: this.jwtService.sign(tokenPayload, {
        expiresIn: recuerdame ? '30d' : '1d',
        secret: this.configService.get<string>('JWT_SECRET'),
      }),
    };
  }
}
