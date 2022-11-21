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
import { CallesService } from './calles.service';
import { CreateCalleDto } from './dto/create-calle.dto';
import { UpdateCalleDto } from './dto/update-calle.dto';

@Controller('calles')
@ApiTags('calles')
export class CallesController {
  constructor(private readonly callesService: CallesService) {}

  @Post()
  create(@Body() createCalleDto: CreateCalleDto) {
    return this.callesService.create(createCalleDto);
  }

  @Get()
  findAll() {
    return this.callesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.callesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCalleDto: UpdateCalleDto) {
    return this.callesService.update(+id, updateCalleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.callesService.remove(+id);
  }
}
