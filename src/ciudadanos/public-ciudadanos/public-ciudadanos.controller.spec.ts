import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CaslCiudadanoAbilityFactory } from '@root/auth/casl/casl-ciudadano-ability.factory';
import { CiudadanoRepository } from '../ciudadanos.repository';
import { CiudadanosService } from '../ciudadanos.service';
import { PublicCiudadanosController } from './public-ciudadanos.controller';

describe('PublicCiudadanosController', () => {
  let controller: PublicCiudadanosController;

  beforeEach(async () => {
    const mockAbilityFactory = {};
    const mockCiudadanoRepository = {};
    const mockCiudadanosService = {};

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicCiudadanosController],
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

    controller = module.get<PublicCiudadanosController>(
      PublicCiudadanosController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  //que tenga los métodos requeridos
  it('should have the required methods', () => {
    expect(controller).toHaveProperty('suscribir');
  });
});
