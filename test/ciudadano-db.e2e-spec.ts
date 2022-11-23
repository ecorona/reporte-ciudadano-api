import { LoginCiudadanoRequest } from '../src/auth/dto/login-ciudadano-request.dto';
import { CreateCiudadanoDto } from '../src/ciudadanos/dto/create-ciudadano.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Rol } from '../src/auth/roles/rol.enum';

describe('CiudadanosController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Suscripción y login de ciudadano', () => {
    it('El ciudadano deberia poder suscribirse', () => {
      const ciudadanoACrear: CreateCiudadanoDto = {
        alias: 'El Chato',
        password: 'password',
        nombres: 'Juan',
        apellidos: 'Perez',
        email: 'juanperez@xst.mx',
      };
      return request(app.getHttpServer())
        .post('/public-ciudadanos/subscribe')
        .send(ciudadanoACrear)
        .expect(201)
        .expect('Content-Type', /json/)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              id: expect.any(Number),
              nombres: ciudadanoACrear.nombres,
              apellidos: ciudadanoACrear.apellidos,
              email: ciudadanoACrear.email,
              roles: [Rol.Ciudadano],
            }),
          );
        });
    });

    it('El ciudadano con un email ya registrado no deberia poder suscribirse', () => {
      const ciudadanoACrear: CreateCiudadanoDto = {
        alias: 'El Chato',
        password: 'password',
        nombres: 'Juan',
        apellidos: 'Perez',
        email: 'juanperez@xst.mx',
      };
      return request(app.getHttpServer())
        .post('/public-ciudadanos/subscribe')
        .send(ciudadanoACrear)
        .expect(400);
    });

    it('El ciudadano con un email no registrado no deberia poder loguearse', () => {
      const loginCiudadanoX: LoginCiudadanoRequest = {
        email: 'noexisto@xst.mx',
        password: 'password',
        recuerdame: true,
      };
      return request(app.getHttpServer())
        .post('/auth/login-ciudadano')
        .send(loginCiudadanoX)
        .expect(401);
    });

    it('El ciudadano suscrito deberia poder loguearse', () => {
      const ciudadanoSuscrito: LoginCiudadanoRequest = {
        email: 'juanperez@xst.mx',
        password: 'password',
      };
      return request(app.getHttpServer())
        .post('/auth/login-ciudadano')
        .send(ciudadanoSuscrito)
        .expect('Content-Type', /json/)
        .expect(201)
        .then((response) => {
          return expect(response.body).toEqual(
            expect.objectContaining({
              access_token: expect.any(String),
            }),
          );
        });
    });

    it('El ciudadano suscrito logueado debe poder ver la lista de ciudadanos', (done) => {
      done('No implementado');
    });

    it('El ciudadano suscrito logueado debe poder su propia informacion', (done) => {
      done('No implementado');
    });

    it('El ciudadano suscrito logueado debe poder actualizar su nombre', (done) => {
      done('No implementado');
    });

    it('El ciudadano suscrito logueado no debe poder actualizar el nombre de otros ciudadanos', (done) => {
      done('No implementado');
    });
  });
});
