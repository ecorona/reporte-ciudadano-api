import { Injectable } from '@nestjs/common';
import { CallesRepository } from './calles.repository';
import { CreateCalleDto } from './dto/create-calle.dto';
import { UpdateCalleDto } from './dto/update-calle.dto';
import { Calle } from './entities/calle.entity';

@Injectable()
export class CallesService {
  constructor(private readonly callesRepository: CallesRepository) {}
  async create(createCalleDto: CreateCalleDto): Promise<Calle> {
    const nuevaCalle = this.callesRepository.create(createCalleDto);
    nuevaCalle.activo = false;
    return this.callesRepository.save(nuevaCalle);
  }

  findAll() {
    return `This action returns all calles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} calle`;
  }

  update(id: number, updateCalleDto: UpdateCalleDto) {
    return `This action updates a #${id} calle, ${updateCalleDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} calle`;
  }

  async fundarCalle(calle: string, ciudadanoId: number): Promise<Calle> {
    const calleACrear = this.callesRepository.create();
    calleACrear.activo = false;
    calleACrear.nombre = calle;
    calleACrear.ciudadanoFundadorId = ciudadanoId;
    return this.callesRepository.save(calleACrear);
  }
}
