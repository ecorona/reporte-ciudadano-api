import { Injectable } from '@nestjs/common';
import { CreateComunicadoDto } from './dto/create-comunicado.dto';
import { UpdateComunicadoDto } from './dto/update-comunicado.dto';

@Injectable()
export class ComunicadosService {
  create(createComunicadoDto: CreateComunicadoDto) {
    return 'This action adds a new comunicado';
  }

  findAll() {
    return `This action returns all comunicados`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comunicado`;
  }

  update(id: number, updateComunicadoDto: UpdateComunicadoDto) {
    return `This action updates a #${id} comunicado`;
  }

  remove(id: number) {
    return `This action removes a #${id} comunicado`;
  }
}
