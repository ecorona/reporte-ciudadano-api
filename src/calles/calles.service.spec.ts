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
      .mockImplementation((dto: CreateCalleDto): Promise<Calle> => {
        const calle = new Calle();
        calle.nombre = dto?.nombre || '';
        return Promise.resolve(calle);
      }),
    save: jest
      .fn()
      .mockImplementation((dto: Partial<Calle>): Promise<Calle> => {
        let calleGuardada = new Calle();
        calleGuardada = {
          id: 1,
          nombre: dto?.nombre || '',
          createdAt: new Date(),
          updatedAt: new Date(),
          version: 1,
          uuid: 'uuid',
          activo: dto?.activo || false,
          ciudadanoFundadorId: dto?.ciudadanoFundadorId || null,
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
    expect(service.fundarCalle).toBeDefined();
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

  //un ciudadano debe poder fundar una calle correctamente
  it('should found a street correctly', async () => {
    const calleACrear: CreateCalleDto = {
      nombre: 'Calle 1',
    };

    const ciudadanoId = 1;

    const calleCreada = await service.fundarCalle(
      calleACrear.nombre,
      ciudadanoId,
    );

    //la calle creada debe tener un id
    expect(calleCreada.id).toEqual(expect.any(Number));

    //el nombre de la calle debe ser el mismo que se le dio
    expect(calleCreada.nombre).toEqual(calleACrear.nombre);

    //se debió llamar al metodo create del repositorio
    expect(mockCallesRepository.create).toHaveBeenCalled();

    //se debió llamar al metodo save del repositorio
    expect(mockCallesRepository.save).toHaveBeenCalled();

    //la calle debe retornar activo en false, debe ser autorizada por alguien mas
    expect(calleCreada.activo).toEqual(false);

    //el id del ciudadanoFundador debe ser el mismo que se le dio
    expect(calleCreada.ciudadanoFundadorId).toEqual(ciudadanoId);
    //debe tener un createdAt y debe ser tipo fecha
    expect(calleCreada.createdAt).toEqual(expect.any(Date));
    //debe tener un updatedAt y debe ser tipo fecha
    expect(calleCreada.updatedAt).toEqual(expect.any(Date));
    //debe tener un version y debe ser tipo number
    expect(calleCreada.version).toEqual(expect.any(Number));
  });
});
