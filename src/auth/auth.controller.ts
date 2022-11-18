import { LoginCiudadanoResponse } from './dto/login-ciudadano-response.dto';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginCiudadanoRequest } from './dto/login-ciudadano-request.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { Ciudadano } from '../ciudadanos/entities/ciudadano.entity';
import { LocalAuthGuard } from './guards/local/local-auth.guard';
import { Public } from './decorators/public.decorator';
import { SesionCiudadano } from './decorators/sesion-ciudadano.decorator';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Throttle(3, 60)
  @ApiOperation({
    summary: 'Inicia la sesión del ciudadano',
  })
  @ApiBody({
    type: LoginCiudadanoRequest,
    description: 'Inicio de sesión de un ciudadano',
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
