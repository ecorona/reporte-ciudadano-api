import { OpcionesPaginacionCiudadano } from './dto/opciones-paginacion-ciudadano.dto';
import { Ciudadano } from './entities/ciudadano.entity';
import { Injectable } from '@nestjs/common';
import { CiudadanoRepository } from './ciudadanos.repository';
import { ICiudadanosService } from './dto/ciudadanos-service.interface';
import { CreateCiudadanoDto } from './dto/create-ciudadano.dto';
import { UpdateCiudadanoDto } from './dto/update-ciudadano.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from '../auth/roles/rol.enum';
import { hash, compare, genSalt } from 'bcryptjs';
import { CaslCiudadanoAbilityFactory } from '../auth/casl/casl-ciudadano-ability.factory';
import { ForbiddenError } from '@casl/ability';
import { Action } from '../auth/casl/actions.enum';
import { EmailService } from '../email/email.service';
import { CIUDADANO_PASSWORD_SALT_ROUNDS } from '../common/constants';

@Injectable()
export class CiudadanosService implements ICiudadanosService {
  constructor(
    @InjectRepository(CiudadanoRepository)
    private readonly ciudadanoRepository: CiudadanoRepository,
    private readonly caslCiudadano: CaslCiudadanoAbilityFactory,
    private readonly emailService: EmailService,
  ) {}

  async suscribir(nuevoCiudadano: CreateCiudadanoDto): Promise<Ciudadano> {
    const ciudadanoACrear = this.ciudadanoRepository.create(nuevoCiudadano);
    ciudadanoACrear.password = await this.encriptarPassword(
      ciudadanoACrear.password,
    );
    ciudadanoACrear.roles = [Rol.Ciudadano];
    const ciudadanoCreado = await this.ciudadanoRepository.save(
      ciudadanoACrear,
    );
    //enviar un email al ciudadano con el service de email
    await this.emailService.enviarEmail({
      email: ciudadanoCreado.email,
      subject: 'Bienvenido a la comunidad',
      template: 'welcome',
      context: ciudadanoCreado,
    });
    return ciudadanoCreado;
  }

  async crearCiudadano(
    createCiudadanoDto: CreateCiudadanoDto,
  ): Promise<Ciudadano> {
    const ciudadanoACrear = this.ciudadanoRepository.create(createCiudadanoDto);
    ciudadanoACrear.password = await this.encriptarPassword(
      ciudadanoACrear.password,
    );
    if (!ciudadanoACrear.roles) {
      ciudadanoACrear.roles = [Rol.Ciudadano];
    }
    const ciudadanoCreado = await this.ciudadanoRepository.save(
      ciudadanoACrear,
    );
    return ciudadanoCreado;
  }

  paginate(opciones: OpcionesPaginacionCiudadano): Promise<Array<Ciudadano>> {
    return this.ciudadanoRepository.paginate(opciones);
  }

  getById(id: number): Promise<Ciudadano> {
    return this.ciudadanoRepository.findOne({ where: { id: id } });
  }

  getByEmail(email: string): Promise<Ciudadano> {
    return this.ciudadanoRepository.findOne({
      where: { email: email.toLowerCase() },
    });
  }

  async actualizarCiudadano(
    id: number,
    updateCiudadanoDto: UpdateCiudadanoDto,
    ciudadanoSesion: Ciudadano,
  ): Promise<Ciudadano> {
    //buscamos el ciudadano que se va a editar, antes de editarlo...
    const ciudadanoAEditar = await this.getById(id);

    //y ver si puede o no editarlo segun las reglas CASL
    const abilitiesCiudadano = this.caslCiudadano.forCiudadano(ciudadanoSesion);

    //y si no puede actualizar al ciudadano... throw forbidden error
    ForbiddenError.from(abilitiesCiudadano)
      .setMessage('Solo puede actualizar su propia información')
      .throwUnlessCan(Action.Update, ciudadanoAEditar, 'password');

    //de lo contrario, continua con la actualización
    return this.ciudadanoRepository.actualizarCiudadano(id, updateCiudadanoDto);
  }

  //encriptar el password del ciudadano cargado
  async encriptarPassword(password: string): Promise<string> {
    return hash(password, await genSalt(CIUDADANO_PASSWORD_SALT_ROUNDS));
  }

  //validar el password del ciudadano cargado
  async validarPassword(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    return compare(password, passwordHash);
  }
}
