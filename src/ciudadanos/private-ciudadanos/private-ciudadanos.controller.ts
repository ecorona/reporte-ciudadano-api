import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SesionCiudadano } from '@root/auth/decorators/sesion-ciudadano.decorator';
import { JwtAuthGuard } from '@root/auth/guards/jwt/jwt-auth.guard';
import { CiudadanosService } from '../ciudadanos.service';
import { OpcionesPaginacionCiudadano } from '../dto/opciones-paginacion-ciudadano.dto';
import { Ciudadano } from '../entities/ciudadano.entity';

@Controller('private-ciudadanos')
@ApiTags('private-ciudadanos')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
export class PrivateCiudadanosController {
  constructor(private readonly ciudadanosService: CiudadanosService) {}

  @Get()
  paginate(
    @Query() opciones: OpcionesPaginacionCiudadano,
  ): Promise<Array<Ciudadano>> {
    return this.ciudadanosService.paginate(opciones);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Ciudadano> {
    return this.ciudadanosService.getById(id);
  }

  @Get('mi/perfil')
  miPerfil(@SesionCiudadano() ciudadano: Ciudadano): Ciudadano {
    return ciudadano;
  }
}
