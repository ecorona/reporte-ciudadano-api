import { Injectable } from '@nestjs/common';
import { CreateRegiduriaDto } from './dto/create-regiduria.dto';
import { UpdateRegiduriaDto } from './dto/update-regiduria.dto';

@Injectable()
export class RegiduriasService {
  create(createRegiduriaDto: CreateRegiduriaDto) {
    return 'This action adds a new regiduria';
  }

  findAll() {
    return `This action returns all regidurias`;
  }

  findOne(id: number) {
    return `This action returns a #${id} regiduria`;
  }

  update(id: number, updateRegiduriaDto: UpdateRegiduriaDto) {
    return `This action updates a #${id} regiduria`;
  }

  remove(id: number) {
    return `This action removes a #${id} regiduria`;
  }
}
