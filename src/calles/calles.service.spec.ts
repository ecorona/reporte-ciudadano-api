import { Calle } from './entities/calle.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { CallesService } from './calles.service';
import { CallesRepository } from './calles.repository';
import { CreateCalleDto } from './dto/create-calle.dto';

describe('CallesService', () => {
  let service: CallesService;
  const mockCallesRepository = {
    create: jest
      .fn()
      .mockImplementation((dto: CreateCalleDto) => Promise.resolve({ ...dto })),
    save: jest
      .fn()
      .mockImplementation((dto: CreateCalleDto): Promise<Calle> => {
        let calleGuardada = new Calle();
        calleGuardada = {
          id: 1,
          ...dto,
          createdAt: new Date(),
          updatedAt: new Date(),
          version: 1,
          activo: false,
        };
        return Promise.resolve(calleGuardada);
      }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CallesService,
        {
          provide: getRepositoryToken(CallesRepository),
          useValue: mockCallesRepository,
        },
      ],
    }).compile();

    service = module.get<CallesService>(CallesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //debe tener un metodo para crear calles
  it('should have a create method', () => {
    expect(service.create).toBeDefined();
  });

  //Debe crear una calle correctamente.
  it('should create a calle correctly', async () => {
    const calleACrear: CreateCalleDto = {
      nombre: 'Calle 1',
    };

    const calleCreada = await service.create(calleACrear);
    //la calle creada debe tener un id
    expect(calleCreada.id).toEqual(expect.any(Number));

    //se debió llamar al metodo create del repositorio
    expect(mockCallesRepository.create).toBeCalledTimes(1);

    //se debió llamar al metodo save del repositorio
    expect(mockCallesRepository.save).toBeCalledTimes(1);
  });
});
