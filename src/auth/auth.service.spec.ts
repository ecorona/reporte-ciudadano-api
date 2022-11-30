import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { CiudadanosService } from '@root/ciudadanos/ciudadanos.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './guards/jwt/jwt.strategy';
import { LocalStrategy } from './guards/local/local.strategy';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
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

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //que tenga los métodos requeridos
  it('should have the required methods', () => {
    expect(service).toHaveProperty('validarLoginCiudadano');
    expect(service).toHaveProperty('login');
  });
});
