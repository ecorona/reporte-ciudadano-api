import { LoginCiudadanoRequest } from '../src/auth/dto/login-ciudadano-request.dto';
import { CreateCiudadanoDto } from '../src/ciudadanos/dto/create-ciudadano.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Rol } from '../src/auth/roles/rol.enum';
/**
 * Pruebas de integración con base de datos.
 *
 * * La base de datos debe estar lista para ejecutarse (mysql/docker-compose)
 * * Los valores del .env deben estár configurados para conectarse a la base de datos.
 * * La base de datos especificada en el .env será limpiada e inicializada con las migraciones.
 */
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
    let access_token_ciudadano: string;
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
          //evaluar los campos requeridos
          expect(response.body.id).toEqual(expect.any(Number));
          expect(response.body.nombres).toEqual(ciudadanoACrear.nombres);
          expect(response.body.apellidos).toEqual(ciudadanoACrear.apellidos);
          expect(response.body.email).toEqual(ciudadanoACrear.email);
          expect(response.body.alias).toBeDefined();
          expect(response.body.createdAt).toBeDefined();
          expect(response.body.deletedAt).toBeDefined();
          expect(response.body.prefijoTelefono).toBeDefined();
          expect(response.body.telefono).toBeDefined();
          expect(response.body.uuid).toEqual(expect.any(String));
          expect(response.body.uuid.length).toEqual(36);
          expect(response.body.version).toEqual(1);
          expect(response.body.roles).toEqual(expect.any(Array<Rol>));
        });
    });

    const ciudadanoACrear: CreateCiudadanoDto = {
      alias: 'El Chato',
      password: 'password',
      nombres: 'Juan',
      apellidos: 'Perez',
      email: 'juanperez@xst.mx',
    };
    it('El ciudadano con un email ya registrado no deberia poder suscribirse', () => {
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

    const loginDataCiudadano: LoginCiudadanoRequest = {
      email: 'juanperez@xst.mx',
      password: 'password',
    };
    it('El ciudadano suscrito deberia poder loguearse', () => {
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
              ciudadano: expect.any(Object),
            }),
          );
        });
    });

    it('El ciudadano suscrito logueado debe poder ver la lista de ciudadanos', () => {
      return request(app.getHttpServer())
        .get('/private-ciudadanos')
        .set('Authorization', `Bearer ${access_token_ciudadano}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.length).toBeGreaterThan(1);
          expect(response.body[0].id).toEqual(expect.any(Number));
        });
    });

    it('El ciudadano suscrito logueado debe poder ver su propia informacion', () => {
      return request(app.getHttpServer())
        .get('/private-ciudadanos/mi/perfil')
        .set('Authorization', `Bearer ${access_token_ciudadano}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.email).toEqual(loginDataCiudadano.email);
        });
    });

    // El ciudadano suscrito logueado debe poder actualizar su nombre

    //El ciudadano suscrito logueado no debe poder actualizar el nombre de otros ciudadanos
  });
});
