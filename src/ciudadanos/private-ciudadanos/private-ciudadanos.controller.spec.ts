import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CaslCiudadanoAbilityFactory } from '@root/auth/casl/casl-ciudadano-ability.factory';
import { CiudadanoRepository } from '../ciudadanos.repository';
import { CiudadanosService } from '../ciudadanos.service';
import { PrivateCiudadanosController } from './private-ciudadanos.controller';

describe('PublicCiudadanosController', () => {
  let controller: PrivateCiudadanosController;

  beforeEach(async () => {
    const mockAbilityFactory = {};
    const mockCiudadanoRepository = {};
    const mockCiudadanosService = {};

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrivateCiudadanosController],
      providers: [
        {
          provide: getRepositoryToken(CiudadanoRepository),
          useValue: mockCiudadanoRepository,
        },
        {
          provide: CiudadanosService,
          useValue: mockCiudadanosService,
        },
        {
          provide: CaslCiudadanoAbilityFactory,
          useValue: mockAbilityFactory,
        },
      ],
    }).compile();

    controller = module.get<PrivateCiudadanosController>(
      PrivateCiudadanosController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  //que tenga los métodos requeridos
  it('should have the required methods', () => {
    expect(controller).toHaveProperty('paginate');
    expect(controller).toHaveProperty('findOne');
    expect(controller).toHaveProperty('miPerfil');
  });
});
