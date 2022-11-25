import { LoginCiudadanoResponse } from './dto/login-ciudadano-response.dto';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginCiudadanoRequest } from './dto/login-ciudadano-request.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { Ciudadano } from '../ciudadanos/entities/ciudadano.entity';
import { LocalAuthGuard } from './guards/local/local-auth.guard';
import { Public } from './decorators/public.decorator';
import { SesionCiudadano } from './decorators/sesion-ciudadano.decorator';

const INTENTOS = 3;
const TIEMPO = 60;

/**
 * Controlador para la autenticación de ciudadanos
 */
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Método para autenticar a un ciudadano
   *
   * @param {LoginCiudadanoRequest} loginCiudadanoRequest datos de autenticación
   * @returns {LoginCiudadanoResponse} token jwt
   * @throws {BadRequestException} si los datos de autenticación son incorrectos
   * @throws {UnauthorizedException} si el ciudadano no está activo
   */
  @Public()
  @Throttle(INTENTOS, TIEMPO)
  @ApiOperation({
    summary: 'Inicia la sesión del ciudadano',
    description: 'Inicia la sesión del ciudadano',
    externalDocs: {
      description: 'Ver más',
      url: 'https://docs.nestjs.com/techniques/authentication',
    },
  })
  @ApiBody({
    type: LoginCiudadanoRequest,
    description: 'Datos de inicio de sesión de un ciudadano',
  })
  @ApiCreatedResponse({
    description: 'El ciudadano ha iniciado sesión',
    type: LoginCiudadanoResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Las credenciales no son válidas',
  })
  @ApiBadRequestResponse({
    description: 'Los datos de inicio de sesión no son válidos',
  })
  @Post('login-ciudadano')
  @UseGuards(LocalAuthGuard)
  async login(
    @Body() datosAcceso: LoginCiudadanoRequest,
    @SesionCiudadano() ciudadano: Ciudadano,
  ): Promise<LoginCiudadanoResponse> {
    return this.authService.login(ciudadano, datosAcceso.recuerdame);
  }
}
