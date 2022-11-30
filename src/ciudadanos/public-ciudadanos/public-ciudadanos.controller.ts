import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@root/auth/decorators/public.decorator';
import { Ciudadano } from '@root/ciudadanos/entities/ciudadano.entity';
import { SyslogInclude } from '@root/syslog/syslog-include.decorator';
import { CiudadanosService } from '../ciudadanos.service';
import { CreateCiudadanoDto } from '../dto/create-ciudadano.dto';

@Controller('public-ciudadanos')
@ApiTags('public-ciudadanos')
@Public()
@UseInterceptors(ClassSerializerInterceptor)
export class PublicCiudadanosController {
  constructor(private readonly ciudadanosService: CiudadanosService) {}

  @Post('subscribe')
  @SyslogInclude('Suscripción de ciudadano', { body: true, response: true })
  async suscribir(
    @Body() nuevoCiudadanoRequest: CreateCiudadanoDto,
  ): Promise<Ciudadano> {
    const ciudadanoSuscrito = await this.ciudadanosService.suscribir(
      nuevoCiudadanoRequest,
    );
    return ciudadanoSuscrito;
  }
}
