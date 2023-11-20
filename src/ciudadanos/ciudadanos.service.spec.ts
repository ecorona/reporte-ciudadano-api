import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CaslCiudadanoAbilityFactory } from '@root/auth/casl/casl-ciudadano-ability.factory';
import { EmailService } from '@root/email/email.service';
import { CiudadanoRepository } from './ciudadanos.repository';
import { CiudadanosService } from './ciudadanos.service';
import { CreateCiudadanoDto } from './dto/create-ciudadano.dto';
import { Ciudadano } from './entities/ciudadano.entity';

describe('CiudadanosService', () => {
  let service: CiudadanosService;
  const mockAbilityFactory = {};
  const mockEmailService = {
    enviarEmail: jest.fn(),
  };
  const mockCiudadanoRepository = {
    //regresa una instancia del ciudadano a crear
    create: jest.fn().mockImplementation((dto: CreateCiudadanoDto) => {
      const ciudadanoAcrear = new Ciudadano();
      ciudadanoAcrear.email = dto.email;
      ciudadanoAcrear.password = dto.password;
      ciudadanoAcrear.nombres = dto.nombres;
      ciudadanoAcrear.apellidos = dto.apellidos;
      ciudadanoAcrear.aceptaPoliticas = false;
      return ciudadanoAcrear;
    }),
    //regresa una instancia del ciudadano creado, con id, createdAt, updatedAt, version
    save: jest.fn().mockImplementation((ciudadano: Ciudadano) => {
      if (!ciudadano.id) {
        ciudadano.id = 1;
      }
      if (!ciudadano.createdAt) {
        ciudadano.createdAt = new Date();
      }
      ciudadano.updatedAt = new Date();
      ciudadano.version = ciudadano.version ? ciudadano.version + 1 : 1;
      return ciudadano;
    }),
    find: jest.fn().mockImplementation(() => {
      return [];
    }),
    getById: jest.fn().mockImplementation((id: number) => {
      const ciudadano = new Ciudadano();
      ciudadano.id = id;
      ciudadano.email = 'ciudadanox@xst.mx';
      return ciudadano;
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(CiudadanoRepository),
          useValue: mockCiudadanoRepository,
        },
        {
          provide: CaslCiudadanoAbilityFactory,
          useValue: mockAbilityFactory,
        },
        {
          provide: EmailService,
          useValue: mockEmailService,
        },
        CiudadanosService,
      ],
    }).compile();

    service = module.get<CiudadanosService>(CiudadanosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //verificar que el servicio tenga los métodos requeridos.
  it('should have the required methods', () => {
    expect(service).toHaveProperty('suscribir');
    expect(service).toHaveProperty('crearCiudadano');
    expect(service).toHaveProperty('paginate');
    expect(service).toHaveProperty('getById');
    expect(service).toHaveProperty('getByEmail');
    expect(service).toHaveProperty('actualizarCiudadano');
    expect(service).toHaveProperty('encriptarPassword');
    expect(service).toHaveProperty('validarPassword');
    expect(service).toHaveProperty('aceptarPoliticas');
  });

  //verificar que el metodo de suscribir, retorne un Ciudadano
  it('suscribir should return a Ciudadano con id', async () => {
    const mockCreateCiudadanoDto: CreateCiudadanoDto = {
      nombres: 'test',
      apellidos: 'test',
      email: 'ecorona@live.com',
      alias: 'Erik',
      password: 'password',
    };
    //suscribir al ciudadano
    const nuevoCiudadano = await service.suscribir(mockCreateCiudadanoDto);
    //probar que los metodos internos del suscribir, sean llamados como se espera
    //que se haya enviado un email
    expect(mockEmailService.enviarEmail).toBeCalled();
    expect(mockCiudadanoRepository.create).toBeCalledWith(
      mockCreateCiudadanoDto,
    );
    //que se haya guardado en la base de datos
    expect(mockCiudadanoRepository.save).toBeCalled();
    //y que el resultado sea una instancia de Ciudadano
    expect(nuevoCiudadano).toBeInstanceOf(Ciudadano);
    //que el password retornado esté encriptado y valide.
    expect(
      await service.validarPassword('password', nuevoCiudadano.password),
    ).toBe(true);
  });

  //verificar que la clase contenga el metodo notificarCiudadano
  it('should have the method notificarCiudadano', () => {
    expect(service).toHaveProperty('notificarCiudadano');
  });

  //al notificar un ciudadano, debe retornar un objeto con el email y el mensaje y notificado: boolean para saber si se notificó
  it('notificarCiudadano should return an object with email, message and notificado', async () => {
    const mockCiudadano = new Ciudadano();
    mockCiudadano.id = 1;
    mockCiudadano.email = 'ecorona@xst.mx';
    mockCiudadano.nombres = 'test';
    mockCiudadano.apellidos = 'test';
    const mockMensaje = 'test';
    const notificacion = await service.notificarCiudadano(
      mockCiudadano,
      mockMensaje,
    );
    //verificar que la funcion notificarCiudadano del service, llame tambien a la de email
    //y siempre lleguien ciertos datos a esa funciona
    expect(mockEmailService.enviarEmail).toBeCalled();
    expect(notificacion).toHaveProperty('notificado');
    //evaluar que la respuesta contenga smtpResponse y dentro uuid
    expect(notificacion).toHaveProperty('smtpResponse');
    //verificar que notificacion.smtpResponse tenga la propiedad uuid
    //ya que se utiliza para identificar el email enviado
    expect(notificacion.smtpResponse).toHaveProperty('uuid');

    //verificar que notificacion.notificado sea true o false
    expect(notificacion.notificado).toBe(true || false);
  });

  //aceptar politicas debe retornar un objeto { result: boolean }
  it('aceptarPoliticas should return an object with the result: true', async () => {
    const mockCiudadano = new Ciudadano();
    mockCiudadano.id = 1;
    const aceptacion = await service.aceptarPoliticas(mockCiudadano.id);
    expect(mockCiudadanoRepository.getById).toBeCalledWith(mockCiudadano.id);
    expect(mockCiudadanoRepository.save).toBeCalled();
    expect(aceptacion).toHaveProperty('result');
    expect(aceptacion.result).toBe(true);
  });
});
