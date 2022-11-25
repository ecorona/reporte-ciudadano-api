import { Regiduria } from './entities/regiduria.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RegiduriasService } from './regidurias.service';
import { CreateRegiduriaDto } from './dto/create-regiduria.dto';
import { UpdateRegiduriaDto } from './dto/update-regiduria.dto';
import { ApiTags } from '@nestjs/swagger';
import { SesionCiudadano } from '../auth/decorators/sesion-ciudadano.decorator';
import { Ciudadano } from '../ciudadanos/entities/ciudadano.entity';

@Controller('regidurias')
@ApiTags('regidurias')
export class RegiduriasController {
  constructor(private readonly regiduriasService: RegiduriasService) {}

  @Post()
  create(
    @Body() createRegiduriaDto: CreateRegiduriaDto,
    @SesionCiudadano() ciudadano: Ciudadano,
  ): Promise<Regiduria> {
    return this.regiduriasService.create(createRegiduriaDto, ciudadano);
  }

  @Get()
  paginate() {
    return this.regiduriasService.paginate();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.regiduriasService.getById(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRegiduriaDto: UpdateRegiduriaDto,
  ) {
    return this.regiduriasService.update(+id, updateRegiduriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regiduriasService.remove(+id);
  }

  @Patch()
  assignAdmin() {}

  @Patch()
  unassignAdmin() {}

  @Patch()
  activate() {}
  @Patch()
  deactivate() {}
}
