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

@Controller('public-ciudadanos')
@ApiTags('public-ciudadanos')
@UseInterceptors(ClassSerializerInterceptor)
@Public()
export class PublicCiudadanosController {
  constructor(private readonly ciudadanosService: CiudadanosService) {}
  @Post('subscribe')
  async suscribir(
    @Body() nuevoCiudadanoRequest: CreateCiudadanoDto,
  ): Promise<Ciudadano> {
    const ciudadanoSuscrito = await this.ciudadanosService.suscribir(
      nuevoCiudadanoRequest,
    );
    //TODO enviar email
    return ciudadanoSuscrito;
  }

  paginate() {
    //TODO: implementar
  }
  findOne() {
    //TODO: implementar
  }
}
