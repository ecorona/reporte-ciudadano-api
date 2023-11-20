import { Test, TestingModule } from '@nestjs/testing';
import { CallesController } from './calles.controller';
import { CallesService } from './calles.service';
import { CreateCalleDto } from './dto/create-calle.dto';
import { Ciudadano } from '@root/ciudadanos/entities/ciudadano.entity';
import { EmailService } from '@root/email/email.service';

describe('CallesController', () => {
  let controller: CallesController;
  const mockEmailService = {
    enviarEmail: jest.fn().mockImplementation(() => {
      return true;
    }),
  };

  const mockCallesService = {
    fundarCalle: jest
      .fn()
      .mockImplementation((calle: string, ciudadanoId: number) => {
        return {
          id: 1,
          nombre: calle,
          createdAt: new Date(),
          updatedAt: new Date(),
          version: 1,
          uuid: 'uuid',
          activo: true,
          ciudadanoFundadorId: ciudadanoId,
        };
      }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CallesController],
      providers: [
        {
          provide: CallesService,
          useValue: mockCallesService,
        },
        {
          provide: EmailService,
          useValue: mockEmailService,
        },
      ],
    }).compile();

    controller = module.get<CallesController>(CallesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(controller.fundarCalle).toBeDefined();
  });

  //al fundar una calle, se debe llamar al método fundarCalle del servicio
  it('should call fundarCalle method from service', async () => {
    const body: CreateCalleDto = { nombre: 'Calle 1' };
    const ciudadano = new Ciudadano();
    ciudadano.id = 1;

    await controller.fundarCalle(body, ciudadano);

    expect(mockCallesService.fundarCalle).toHaveBeenCalledWith(
      body.nombre,
      ciudadano.id,
    );

    //se debio llamar al metodo enviarEmail del servicio de email
    expect(mockEmailService.enviarEmail).toHaveBeenCalled();
  });
});
