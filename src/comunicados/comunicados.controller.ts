import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ComunicadosService } from './comunicados.service';
import { CreateComunicadoDto } from './dto/create-comunicado.dto';
import { UpdateComunicadoDto } from './dto/update-comunicado.dto';

@Controller('comunicados')
@ApiTags('comunicados')
export class ComunicadosController {
  constructor(private readonly comunicadosService: ComunicadosService) {}

  @Post()
  create(@Body() createComunicadoDto: CreateComunicadoDto) {
    return this.comunicadosService.create(createComunicadoDto);
  }

  @Get()
  findAll() {
    return this.comunicadosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comunicadosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateComunicadoDto: UpdateComunicadoDto,
  ) {
    return this.comunicadosService.update(+id, updateComunicadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comunicadosService.remove(+id);
  }
}
