import { JwtAuthGuard } from '../../auth/guards/jwt/jwt-auth.guard';
import { OpcionesPaginacionCiudadano } from '../dto/opciones-paginacion-ciudadano.dto';
import { Ciudadano } from '../entities/ciudadano.entity';
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
import { CiudadanosService } from '../ciudadanos.service';
import { ApiTags } from '@nestjs/swagger';
import { SesionCiudadano } from '../../auth/decorators/sesion-ciudadano.decorator';

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
