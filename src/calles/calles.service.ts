import { Injectable } from '@nestjs/common';
import { CreateCalleDto } from './dto/create-calle.dto';
import { UpdateCalleDto } from './dto/update-calle.dto';

@Injectable()
export class CallesService {
  create(createCalleDto: CreateCalleDto) {
    return 'This action adds a new calle';
  }

  findAll() {
    return `This action returns all calles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} calle`;
  }

  update(id: number, updateCalleDto: UpdateCalleDto) {
    return `This action updates a #${id} calle`;
  }

  remove(id: number) {
    return `This action removes a #${id} calle`;
  }
}
