import { ReporteRepository } from './../reportes.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { ReportesPublicController } from './reportes-public.controller';
import { ReportesService } from '../reportes.service';
import { CreateReporteDto } from '../dto/create-reporte.dto';
import { Rol } from '@root/auth/roles/rol.enum';
import { Ciudadano } from '@root/ciudadanos/entities/ciudadano.entity';

describe('ReportesPublicController', () => {
  let controller: ReportesPublicController;
  const mockReporteRepository = {};
  const mockReportesService = {
    createPublic: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportesPublicController],
      providers: [
        {
          provide: ReportesService,
          useValue: mockReportesService,
        },
        {
          provide: getRepositoryToken(ReporteRepository),
          useValue: mockReporteRepository,
        },
      ],
    }).compile();

    controller = module.get<ReportesPublicController>(ReportesPublicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    //que tenga los metodos requeridos por la funcionalidad
    expect(controller.create).toBeDefined();
    expect(controller.paginate).toBeDefined();
    expect(controller.findOne).toBeDefined();
  });

  it('debe crear un reporte publico', async () => {
    const ciudadano: Ciudadano = {
      id: 1,
      telefono: '1234567890',
      prefijoTelefono: '52',
      password: '',
      alias: 'dummy',
      nombres: 'Juan',
      apellidos: 'Perez',
      email: 'juan@perez@gmail.com',
      roles: [Rol.Ciudadano],
      aceptaPoliticas: true,
    };
    const reporte: CreateReporteDto = {
      descripcion: 'Descripcion del reporte 1',
      tipoReporteId: 1,
      lat: 1,
      lng: 1,
      direccion: 'Direccion del reporte 1',
    };
    await controller.create(reporte, ciudadano);
    //que se hayan llamado las funciones del repositorio
    expect(mockReportesService.createPublic).toBeCalled();

    //TODO: verificar mejor el resultado
  });
});
