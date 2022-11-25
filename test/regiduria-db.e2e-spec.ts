import { LoginCiudadanoRequest } from '../src/auth/dto/login-ciudadano-request.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateRegiduriaDto } from 'src/regidurias/dto/create-regiduria.dto';

describe('RegiduriasController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Login de admin y crear regiduria', () => {
    let access_token_ciudadano: string;

    const loginDataCiudadano: LoginCiudadanoRequest = {
      email: 'admin@xst.mx',
      password: 'password',
    };
    it('El ciudadano adminstrador deberia poder loguearse', () => {
      return request(app.getHttpServer())
        .post('/auth/login-ciudadano')
        .send(loginDataCiudadano)
        .expect('Content-Type', /json/)
        .expect(201)
        .then((response) => {
          access_token_ciudadano = response.body?.access_token || undefined;
          return expect(response.body).toEqual(
            expect.objectContaining({
              access_token: expect.any(String),
            }),
          );
        });
    });

    it('El ciudadano administrador logueado debe crear una regiduria', () => {
      const regiduraACrear: CreateRegiduriaDto = {
        nombre: 'Regiduria de prueba',
      };
      return request(app.getHttpServer())
        .post('/regidurias')
        .set('Authorization', `Bearer ${access_token_ciudadano}`)
        .send(regiduraACrear)
        .expect('Content-Type', /json/)
        .expect(201)
        .then((response) => {
          expect(response.body.id).toEqual(expect.any(Number));
          expect(response.body.nombre).toEqual(regiduraACrear.nombre);
        });
    });
  });
});
