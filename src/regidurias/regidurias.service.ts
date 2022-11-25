import { Regiduria } from './entities/regiduria.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Rol } from '../auth/roles/rol.enum';
import { Ciudadano } from '../ciudadanos/entities/ciudadano.entity';
import { CreateRegiduriaDto } from './dto/create-regiduria.dto';
import { UpdateRegiduriaDto } from './dto/update-regiduria.dto';
import { RegiduriasRepository } from './regidurias.repository';

@Injectable()
export class RegiduriasService {
  constructor(private readonly regiduriasRepository: RegiduriasRepository) {}
  create(
    createRegiduriaDto: CreateRegiduriaDto,
    userCreando: Ciudadano,
  ): Promise<Regiduria> {
    //solo puede crearla un administrador
    if (userCreando.roles.indexOf(Rol.Administrador) === -1) {
      throw new HttpException('No autorizado', HttpStatus.UNAUTHORIZED);
    }
    return this.regiduriasRepository.save(createRegiduriaDto);
  }

  paginate() {
    return `This action returns all regidurias`;
  }

  getById(id: number) {
    return `This action returns a #${id} regiduria`;
  }
  assignAdmin() {
    //TODO:
  }
  unassignAdmin() {
    //TODO:
  }
  activate() {
    //TODO:
  }
  deactivate() {
    //TODO:
  }

  update(id: number, updateRegiduriaDto: UpdateRegiduriaDto) {
    return `This action updates a #${id} regiduria`;
  }

  remove(id: number) {
    return `This action removes a #${id} regiduria`;
  }
}
