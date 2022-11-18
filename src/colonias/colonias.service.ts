import { Injectable } from '@nestjs/common';
import { CreateColoniaDto } from './dto/create-colonia.dto';
import { UpdateColoniaDto } from './dto/update-colonia.dto';

@Injectable()
export class ColoniasService {
  create(createColoniaDto: CreateColoniaDto) {
    return 'This action adds a new colonia';
  }

  findAll() {
    return `This action returns all colonias`;
  }

  findOne(id: number) {
    return `This action returns a #${id} colonia`;
  }

  update(id: number, updateColoniaDto: UpdateColoniaDto) {
    return `This action updates a #${id} colonia`;
  }

  remove(id: number) {
    return `This action removes a #${id} colonia`;
  }
}
