import { Test, TestingModule } from '@nestjs/testing';
import { CallesService } from './calles.service';

describe('CallesService', () => {
  let service: CallesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CallesService],
    }).compile();

    service = module.get<CallesService>(CallesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
