import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Action } from '@root/auth/casl/actions.enum';
import { CheckPolicies } from '@root/auth/casl/check-policies.decorator';
import { PoliciesGuard } from '@root/auth/casl/policies.guard';
import { SesionCiudadano } from '@root/auth/decorators/sesion-ciudadano.decorator';
import { Rol } from '@root/auth/roles/rol.enum';
import { Roles } from '@root/auth/roles/roles.decorator';
import { SyslogInclude } from '@root/syslog/syslog-include.decorator';
import { CiudadanosService } from '../ciudadanos.service';
import { CreateCiudadanoDto } from '../dto/create-ciudadano.dto';
import { OpcionesPaginacionCiudadano } from '../dto/opciones-paginacion-ciudadano.dto';
import { UpdateCiudadanoDto } from '../dto/update-ciudadano.dto';
import { Ciudadano } from '../entities/ciudadano.entity';

@Controller('ciudadanos')
@ApiTags('ciudadanos')
@ApiBearerAuth()
@UseGuards(PoliciesGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Roles(Rol.Administrador)
export class AdminCiudadanosController {
  constructor(private readonly ciudadanosService: CiudadanosService) {}

  @Post()
  @SyslogInclude('POST /ciudadanos', { body: true, response: true })
  @CheckPolicies((ability) => ability.can(Action.Create, Ciudadano))
  create(@Body() createCiudadanoDto: CreateCiudadanoDto): Promise<Ciudadano> {
    return this.ciudadanosService.crearCiudadano(createCiudadanoDto);
  }

  @Get()
  @CheckPolicies((ability) => ability.can(Action.Read, Ciudadano))
  paginate(
    @Query() opciones: OpcionesPaginacionCiudadano,
  ): Promise<Array<Ciudadano>> {
    return this.ciudadanosService.paginate(opciones);
  }

  @Get(':id')
  @CheckPolicies((ability) => ability.can(Action.Read, Ciudadano))
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Ciudadano> {
    return this.ciudadanosService.getById(id);
  }

  @Patch(':id')
  @SyslogInclude('PATCH /ciudadanos', { body: true, response: true })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCiudadanoDto: UpdateCiudadanoDto,
    @SesionCiudadano() ciudadanoSesion: Ciudadano,
  ): Promise<Ciudadano> {
    //para la actualización pasamos el ciudadano actual
    //esto para que se pueda validar a nivel servicio las reglas CASL
    //que se aplican a la actualización de ciudadano
    return this.ciudadanosService.actualizarCiudadano(
      id,
      updateCiudadanoDto,
      ciudadanoSesion,
    );
  }
}
