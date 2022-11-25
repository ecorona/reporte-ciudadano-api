import { CallesRepository } from './calles.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { CallesController } from './calles.controller';
import { CallesService } from './calles.service';

describe('CallesController', () => {
  let controller: CallesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CallesController],
      providers: [
        CallesService,
        {
          provide: getRepositoryToken(CallesRepository),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<CallesController>(CallesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
