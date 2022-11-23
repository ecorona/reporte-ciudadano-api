import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CaslCiudadanoAbilityFactory } from '../auth/casl/casl-ciudadano-ability.factory';
import { CiudadanoRepository } from './ciudadanos.repository';
import { CiudadanosService } from './ciudadanos.service';

describe('CiudadanosService', () => {
  let service: CiudadanosService;

  beforeEach(async () => {
    const mockAbilityFactory = {};
    const mockCiudadanoRepository = {};
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(CiudadanoRepository),
          useValue: mockCiudadanoRepository,
        },
        CiudadanosService,
        {
          provide: CaslCiudadanoAbilityFactory,
          useValue: mockAbilityFactory,
        },
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
    expect(service).toHaveProperty('enviarEmail');
    expect(service).toHaveProperty('actualizarCiudadano');
    expect(service).toHaveProperty('encriptarPassword');
    expect(service).toHaveProperty('validarPassword');
  });
});
