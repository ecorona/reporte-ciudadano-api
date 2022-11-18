import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ColoniasService } from './colonias.service';
import { CreateColoniaDto } from './dto/create-colonia.dto';
import { UpdateColoniaDto } from './dto/update-colonia.dto';

@Controller('colonias')
export class ColoniasController {
  constructor(private readonly coloniasService: ColoniasService) {}

  @Post()
  create(@Body() createColoniaDto: CreateColoniaDto) {
    return this.coloniasService.create(createColoniaDto);
  }

  @Get()
  findAll() {
    return this.coloniasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coloniasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateColoniaDto: UpdateColoniaDto) {
    return this.coloniasService.update(+id, updateColoniaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coloniasService.remove(+id);
  }
}
