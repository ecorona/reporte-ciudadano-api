import { Test, TestingModule } from '@nestjs/testing';
import { RegiduriasController } from './regidurias.controller';
import { RegiduriasService } from './regidurias.service';

describe('RegiduriasController', () => {
  let controller: RegiduriasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegiduriasController],
      providers: [RegiduriasService],
    }).compile();

    controller = module.get<RegiduriasController>(RegiduriasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
