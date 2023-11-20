import { Ciudadano } from '@root/ciudadanos/entities/ciudadano.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { ReportesService } from './reportes.service';
import { ReporteRepository } from './reportes.repository';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { Rol } from '@root/auth/roles/rol.enum';

describe('ReportesService', () => {
  let service: ReportesService;
  const mockReporteRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportesService,
        {
          provide: getRepositoryToken(ReporteRepository),
          useValue: mockReporteRepository,
        },
      ],
    }).compile();

    service = module.get<ReportesService>(ReportesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    //que tenga los metodos requeridos por la funcionalidad
    expect(service.createPublic).toBeDefined();
    expect(service.paginatePublic).toBeDefined();
    expect(service.findOne).toBeDefined();
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
    await service.createPublic(reporte, ciudadano);
    //que se hayan llamado las funciones del repositorio
    expect(mockReporteRepository.create).toBeCalled();
    expect(mockReporteRepository.save).toBeCalled();

    //TODO: evaluar mejor el resultado
  });
});
