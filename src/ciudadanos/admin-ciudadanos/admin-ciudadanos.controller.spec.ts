import { Test, TestingModule } from '@nestjs/testing';
import { AdminCiudadanosController } from './admin-ciudadanos.controller';
import { CiudadanosService } from '../ciudadanos.service';

describe('CiudadanosController', () => {
  let controller: AdminCiudadanosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminCiudadanosController],
      providers: [CiudadanosService],
    }).compile();

    controller = module.get<AdminCiudadanosController>(
      AdminCiudadanosController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
