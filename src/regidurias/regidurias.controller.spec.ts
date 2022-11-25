import { Ciudadano } from './../ciudadanos/entities/ciudadano.entity';
import { CreateRegiduriaDto } from './dto/create-regiduria.dto';
import { RegiduriasRepository } from './regidurias.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { RegiduriasController } from './regidurias.controller';
import { RegiduriasService } from './regidurias.service';
import { Rol } from '../auth/roles/rol.enum';

describe('RegiduriasController', () => {
  let controller: RegiduriasController;
  let mockRegiduriasService = {
    create: jest
      .fn()
      .mockImplementation((dto: CreateRegiduriaDto, ciudadano: Ciudadano) => {
        return {
          ...dto,
          id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
          activo: false,
          version: 1,
        };
      }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegiduriasController],
      providers: [
        {
          provide: RegiduriasService,
          useValue: mockRegiduriasService,
        },
        {
          provide: getRepositoryToken(RegiduriasRepository),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<RegiduriasController>(RegiduriasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  //evaluar que tenga los metodos requeridos
  it('Que tenga los metodos requeridos para su funcionalidad', () => {
    expect(controller).toHaveProperty('create');
    expect(controller).toHaveProperty('paginate');
    expect(controller).toHaveProperty('getById');
    expect(controller).toHaveProperty('update');
    expect(controller).toHaveProperty('assignAdmin');
    expect(controller).toHaveProperty('unassignAdmin');
    expect(controller).toHaveProperty('activate');
    expect(controller).toHaveProperty('deactivate');
  });

  //validar que el metodo create funcione correctamente
  it('Que el metodo create funcione correctamente', async () => {
    const dtoACrear: CreateRegiduriaDto = {
      nombre: 'Regiduria 1',
    };
    const ciudadanoCreando = new Ciudadano();
    ciudadanoCreando.id = 1;
    ciudadanoCreando.nombres = 'Juan';
    ciudadanoCreando.apellidos = 'Perez';
    ciudadanoCreando.email = 'juan@perez.mx';
    ciudadanoCreando.roles = [Rol.Administrador];

    const ciudadanoRetornado = await controller.create(
      dtoACrear,
      ciudadanoCreando,
    );

    expect(mockRegiduriasService.create).toBeCalled();
    expect(ciudadanoRetornado).toHaveProperty('id');
    expect(ciudadanoRetornado.id).toEqual(expect.any(Number));
    expect(ciudadanoRetornado).toHaveProperty('nombre');
    expect(ciudadanoRetornado.nombre).toEqual(dtoACrear.nombre);
  });
});
