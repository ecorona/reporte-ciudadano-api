import { Test, TestingModule } from '@nestjs/testing';
import { ComunicadosService } from './comunicados.service';

describe('ComunicadosService', () => {
  let service: ComunicadosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComunicadosService],
    }).compile();

    service = module.get<ComunicadosService>(ComunicadosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
