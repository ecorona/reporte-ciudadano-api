import { OpcionesPaginacionCiudadano } from './dto/opciones-paginacion-ciudadano.dto';
import { UpdateCiudadanoDto } from './dto/update-ciudadano.dto';
import { Repository } from 'typeorm';
import { Ciudadano } from './entities/ciudadano.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CiudadanoRepository extends Repository<Ciudadano> {
  private logger = new Logger(CiudadanoRepository.name);

  constructor(@InjectRepository(Ciudadano) repository: Repository<Ciudadano>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  getByEmail(email: string): Promise<Ciudadano> {
    return this.findOne({ where: { email: email.toLowerCase() } });
  }

  paginate(opciones: OpcionesPaginacionCiudadano): Promise<Array<Ciudadano>> {
    this.logger.log('Paginando con opciones: ' + JSON.stringify(opciones));
    return this.find();
  }

  async actualizarCiudadano(
    id: number,
    updateData: UpdateCiudadanoDto,
  ): Promise<Ciudadano> {
    const ciudadano = await this.findOne({ where: { id } });
    if (ciudadano?.id) {
      const ciudadanoEditado = {
        ...ciudadano,
        ...updateData,
      };
      return this.save(ciudadanoEditado);
    }
    return null;
  }
}
