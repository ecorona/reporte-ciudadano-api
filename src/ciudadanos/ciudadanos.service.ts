import { ForbiddenError } from '@casl/ability';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Action } from '@root/auth/casl/actions.enum';
import { CaslCiudadanoAbilityFactory } from '@root/auth/casl/casl-ciudadano-ability.factory';
import { Rol } from '@root/auth/roles/rol.enum';
import { CIUDADANO_PASSWORD_SALT_ROUNDS } from '@root/common/constants';
import { EmailService } from '@root/email/email.service';
import { compare, genSalt, hash } from 'bcryptjs';
import { CiudadanoRepository } from './ciudadanos.repository';
import { ICiudadanosService } from './dto/ciudadanos-service.interface';
import { CreateCiudadanoDto } from './dto/create-ciudadano.dto';
import { OpcionesPaginacionCiudadano } from './dto/opciones-paginacion-ciudadano.dto';
import { UpdateCiudadanoDto } from './dto/update-ciudadano.dto';
import { Ciudadano } from './entities/ciudadano.entity';

@Injectable()
export class CiudadanosService implements ICiudadanosService {
  private logger = new Logger(CiudadanosService.name);
  constructor(
    @InjectRepository(CiudadanoRepository)
    private readonly ciudadanoRepository: CiudadanoRepository,
    private readonly caslCiudadano: CaslCiudadanoAbilityFactory,
    private readonly emailService: EmailService,
  ) {}

  async suscribir(nuevoCiudadano: CreateCiudadanoDto): Promise<Ciudadano> {
    //preparar datos requeridos por el entity
    const ciudadanoACrear = this.ciudadanoRepository.create(nuevoCiudadano);
    ciudadanoACrear.password = await this.encriptarPassword(
      ciudadanoACrear.password,
    );
    //roles que tendrá
    ciudadanoACrear.roles = [Rol.Ciudadano];

    //si es el primer ciudadano, darle el rol de administrador
    const totalCiudadanos = await this.ciudadanoRepository.find();
    if (totalCiudadanos.length === 0) {
      ciudadanoACrear.roles.unshift(Rol.Administrador);
    }

    //insertarlo en la base de datos.
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

  //metodo para notificar a un ciudadano
  async notificarCiudadano(
    ciudadano: Ciudadano,
    mensaje: string,
  ): Promise<{ notificado: boolean; smtpResponse: { uuid: string } }> {
    //enviar un email al ciudadano con el service de email
    const response = await this.emailService.enviarEmail({
      email: ciudadano.email,
      subject: 'Notificación de la comunidad',
      template: 'notification',
      context: {
        mensaje,
      },
    });
    return {
      notificado: true,
      smtpResponse: { uuid: response },
    };
  }

  async aceptarPoliticas(
    ciudadanoId: number,
  ): Promise<{ result: boolean; error?: string }> {
    try {
      //buscar al ciudadano, si no existe, throw not found, si existe, continuar
      const ciudadano = await this.ciudadanoRepository.getById(ciudadanoId);
      if (!ciudadano) {
        throw new Error('Ciudadano no encontrado');
      }
      ciudadano.aceptaPoliticas = true;
      await this.ciudadanoRepository.save(ciudadano);
      return { result: true };
    } catch (error) {
      this.logger.error(error);
      return { result: false, error: error.message || 'Error' };
    }
  }
}
