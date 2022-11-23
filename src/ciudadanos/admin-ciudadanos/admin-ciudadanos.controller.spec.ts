import { Test, TestingModule } from '@nestjs/testing';
import { AdminCiudadanosController } from './admin-ciudadanos.controller';
import { CiudadanosService } from '../ciudadanos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CaslCiudadanoAbilityFactory } from '../../auth/casl/casl-ciudadano-ability.factory';
import { CiudadanoRepository } from '../ciudadanos.repository';

describe('CiudadanosController', () => {
  let controller: AdminCiudadanosController;

  beforeEach(async () => {
    const mockAbilityFactory = {};
    const mockCiudadanoRepository = {};
    const mockCiudadanosService = {};
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminCiudadanosController],
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

    controller = module.get<AdminCiudadanosController>(
      AdminCiudadanosController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  //que tenga los métodos requeridos
  it('should have the required methods', () => {
    expect(controller).toHaveProperty('create');
    expect(controller).toHaveProperty('paginate');
    expect(controller).toHaveProperty('findOne');
    expect(controller).toHaveProperty('update');
  });
});
