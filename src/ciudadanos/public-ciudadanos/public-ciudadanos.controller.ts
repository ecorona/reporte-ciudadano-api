import { Ciudadano } from '../../ciudadanos/entities/ciudadano.entity';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { Public } from '../../auth/decorators/public.decorator';
import { CiudadanosService } from '../ciudadanos.service';
import { CreateCiudadanoDto } from '../dto/create-ciudadano.dto';
import { ApiTags } from '@nestjs/swagger';
import { SyslogInclude } from 'src/syslog/syslog-include.decorator';

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
