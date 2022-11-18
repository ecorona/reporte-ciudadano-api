import { Test, TestingModule } from '@nestjs/testing';
import { ReportesService } from './reportes.service';

describe('ReportesService', () => {
  let service: ReportesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportesService],
    }).compile();

    service = module.get<ReportesService>(ReportesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
