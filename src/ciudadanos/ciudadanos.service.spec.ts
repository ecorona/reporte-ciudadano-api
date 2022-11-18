import { Test, TestingModule } from '@nestjs/testing';
import { CiudadanosService } from './ciudadanos.service';

describe('CiudadanosService', () => {
  let service: CiudadanosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CiudadanosService],
    }).compile();

    service = module.get<CiudadanosService>(CiudadanosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
