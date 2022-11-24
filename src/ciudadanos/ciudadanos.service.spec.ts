import { Ciudadano } from './entities/ciudadano.entity';
import { CreateCiudadanoDto } from './dto/create-ciudadano.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CaslCiudadanoAbilityFactory } from '../auth/casl/casl-ciudadano-ability.factory';
import { CiudadanoRepository } from './ciudadanos.repository';
import { CiudadanosService } from './ciudadanos.service';
import { EmailService } from '../email/email.service';

describe('CiudadanosService', () => {
  let service: CiudadanosService;
  const mockAbilityFactory = {};
  const mockEmailService = {
    enviarEmail: jest
      .fn()
      .mockImplementation((params) => Promise.resolve(params)),
  };
  const mockCiudadanoRepository = {
    //regresa una instancia del ciudadano a crear
    create: jest.fn().mockImplementation((dto: CreateCiudadanoDto) => {
      const ciudadanoAcrear = new Ciudadano();
      ciudadanoAcrear.email = dto.email;
      ciudadanoAcrear.password = dto.password;
      ciudadanoAcrear.nombres = dto.nombres;
      ciudadanoAcrear.apellidos = dto.apellidos;
      return ciudadanoAcrear;
    }),
    //regresa una instancia del ciudadano creado, con id, createdAt, updatedAt, version
    save: jest.fn().mockImplementation((ciudadano: Ciudadano) => {
      ciudadano.id = 1;
      ciudadano.createdAt = new Date();
      ciudadano.updatedAt = new Date();
      ciudadano.version = 1;
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
});
