import { Test, TestingModule } from '@nestjs/testing';
import { RegiduriasService } from './regidurias.service';

describe('RegiduriasService', () => {
  let service: RegiduriasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegiduriasService],
    }).compile();

    service = module.get<RegiduriasService>(RegiduriasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
