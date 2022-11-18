import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegiduriasService } from './regidurias.service';
import { CreateRegiduriaDto } from './dto/create-regiduria.dto';
import { UpdateRegiduriaDto } from './dto/update-regiduria.dto';

@Controller('regidurias')
export class RegiduriasController {
  constructor(private readonly regiduriasService: RegiduriasService) {}

  @Post()
  create(@Body() createRegiduriaDto: CreateRegiduriaDto) {
    return this.regiduriasService.create(createRegiduriaDto);
  }

  @Get()
  findAll() {
    return this.regiduriasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regiduriasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegiduriaDto: UpdateRegiduriaDto) {
    return this.regiduriasService.update(+id, updateRegiduriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regiduriasService.remove(+id);
  }
}
