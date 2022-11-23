import { Test, TestingModule } from '@nestjs/testing';
import { CiudadanoRepository } from '../ciudadanos/ciudadanos.repository';
import { ComunicadosController } from './comunicados.controller';
import { ComunicadosService } from './comunicados.service';

describe('ComunicadosController', () => {
  let controller: ComunicadosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComunicadosController],
      providers: [
        {
          provide: ComunicadosService,
          useValue: {},
        },
        {
          provide: CiudadanoRepository,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ComunicadosController>(ComunicadosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
