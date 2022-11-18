import { Test, TestingModule } from '@nestjs/testing';
import { ColoniasService } from './colonias.service';

describe('ColoniasService', () => {
  let service: ColoniasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ColoniasService],
    }).compile();

    service = module.get<ColoniasService>(ColoniasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
