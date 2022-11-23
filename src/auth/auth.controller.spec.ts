import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { CiudadanosService } from '../ciudadanos/ciudadanos.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './guards/jwt/jwt.strategy';
import { LocalStrategy } from './guards/local/local.strategy';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {},
        },
        {
          provide: JwtService,
          useValue: {},
        },
        {
          provide: ConfigService,
          useValue: {},
        },
        {
          provide: LocalStrategy,
          useValue: {},
        },
        {
          provide: JwtStrategy,
          useValue: {},
        },
        {
          provide: CiudadanosService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  //que tenga los métodos requeridos
  it('should have login method', () => {
    expect(controller).toHaveProperty('login');
  });
});
