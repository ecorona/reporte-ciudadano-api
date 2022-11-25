import { HttpException } from '@nestjs/common';
import { Regiduria } from './entities/regiduria.entity';
import { Ciudadano } from './../ciudadanos/entities/ciudadano.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateRegiduriaDto } from './dto/create-regiduria.dto';
import { RegiduriasService } from './regidurias.service';
import { Rol } from '../auth/roles/rol.enum';
import { RegiduriasRepository } from './regidurias.repository';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('RegiduriasService', () => {
  let service: RegiduriasService;
  const mockRegidurasRepository = {
    save: jest.fn().mockImplementation((regiduraACrear: CreateRegiduriaDto) => {
      let regiduriaNueva = new Regiduria();
      regiduriaNueva = {
        id: 1,
        ...regiduraACrear,
        activo: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        version: 1,
      };
      return Promise.resolve(regiduriaNueva);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegiduriasService,
        {
          provide: getRepositoryToken(RegiduriasRepository),
          useValue: mockRegidurasRepository,
        },
      ],
    }).compile();

    service = module.get<RegiduriasService>(RegiduriasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //prueba de estrcutura del service con sus metodos.
  it('Que tenga los metodos requeridos para su funcionalidad', () => {
    expect(service).toHaveProperty('create');
    expect(service.paginate).toBeDefined();
    expect(service).toHaveProperty('getById');
    expect(service).toHaveProperty('update');
    expect(service).toHaveProperty('assignAdmin');
    expect(service).toHaveProperty('unassignAdmin');
    expect(service).toHaveProperty('activate');
    expect(service).toHaveProperty('deactivate');
  });

  //deben poder ser dados de alta por un administrador municipal
  //reglas, nombre no es vacio, minimo 5 caracteres, alfanumerico
  it('Que se pueda dar de alta por un administrador municipal', async () => {
    //AAA - Arrange
    const regiduriaACrear: CreateRegiduriaDto = {
      nombre: 'Regiduria de prueba',
    };

    const usuarioCreando = new Ciudadano();
    usuarioCreando.id = 1;
    usuarioCreando.nombres = 'Juan';
    usuarioCreando.apellidos = 'Perez';
    usuarioCreando.email = 'juan@xst.mx';
    usuarioCreando.roles = [Rol.Administrador];

    //AAA - Act
    const regiduriaCreada = await service.create(
      regiduriaACrear,
      usuarioCreando,
    );

    //AAA - Assert

    //que del repositorio se llame al medoto save.
    expect(mockRegidurasRepository.save).toBeCalled();
    //que la regiduria retorne tenga el nombre que se le asigno.
    expect(regiduriaCreada.nombre).toBe(regiduriaACrear.nombre);
    //que tenga un id, created at de tipo fecha
    expect(regiduriaCreada.id).toEqual(expect.any(Number));
    expect(regiduriaCreada.createdAt).toEqual(expect.any(Date));
    //que no esté activa por default
    expect(regiduriaCreada.activo).toBe(false);
  });

  //si no es administrador municipal no debe poder dar de alta una regiduria
  it('Que no se pueda dar de alta por un usuario no administrador municipal', async () => {
    //AAA - Arrange
    const regiduriaACrear: CreateRegiduriaDto = {
      nombre: 'Regiduria de prueba',
    };

    const usuarioCreando = new Ciudadano();
    usuarioCreando.id = 1;
    usuarioCreando.nombres = 'Juan';
    usuarioCreando.apellidos = 'Perez';
    usuarioCreando.email = 'juan@xst.mx';
    usuarioCreando.roles = [Rol.Ciudadano];

    //AAA - Act
    expect(() => {
      service.create(regiduriaACrear, usuarioCreando);
    }).toThrow(HttpException);
  });

  //paginación de registro de regidurias
  //obtener una regiduria por id
  //modificacion solo el nombre
  //asignar administrador
  //desasignar administrador
  //activar/desactivar
});
