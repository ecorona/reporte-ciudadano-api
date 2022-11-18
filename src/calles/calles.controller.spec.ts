import { Test, TestingModule } from '@nestjs/testing';
import { CallesController } from './calles.controller';
import { CallesService } from './calles.service';

describe('CallesController', () => {
  let controller: CallesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CallesController],
      providers: [CallesService],
    }).compile();

    controller = module.get<CallesController>(CallesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
