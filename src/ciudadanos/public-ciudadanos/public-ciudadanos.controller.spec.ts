import { Test, TestingModule } from '@nestjs/testing';
import { PublicCiudadanosController } from './public-ciudadanos.controller';

describe('PublicCiudadanosController', () => {
  let controller: PublicCiudadanosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicCiudadanosController],
    }).compile();

    controller = module.get<PublicCiudadanosController>(PublicCiudadanosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
