# Reporte Ciudadano - API

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ecorona_reporte-ciudadano-api&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ecorona_reporte-ciudadano-api)

El presente repositorio es parte de un grupo de respositorios que en conjunto, suman el esfuerzo para generar una herramienta Open Source que permita a un municipio tener contacto cercano con sus ciudadanos.

### Requerimientos de Infraestructura

- Un API en la nube para centralizar la plataforma.
- Una plataforma Web de administrador para el personal del municipio
- Una aplicación móvil para la ciudadania en donde pueda interactuar con la plataforma.
- Microservicios para
  - Cola de Envío de whatsapp (ultramsg o similar)
  - Log de sistema (TCP) (google logs)
  - Cola de Envío de Correo Electrónico (SMTP Configurable)
  - Análisis de lenguaje con Google Cloud (moderación de comentarios)
- Dockerizado
- Despliegue con kubernetes
- Caché con Redis

### Los demás repositorios de la plataforma:

- [Administrador Web](https://angular.io/) (Angular)
- [Aplicación Móvil](https://ionicframework.com/) (Ionic)
- [API](https://nestjs.com/) (NestJS)

## Entidades y Actores

La funcionalidad de las entidades principales se encuentra descrita a continuación:

- [Ciudadanos](src/ciudadanos/ciudadanos.md)
- [Regidurias](src/regidurias/regidurias.md)
- [Comunicados](src/comunicados/comunicados.md)
- [ReportesCiudadanos](src/reportes/reportes.md)
- [Calles](src/calles/calles.md)
- [Colonias](src/colonias/colonias.md)

# Cosas de Nerds

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Reporte Ciudadano is [MIT licensed](LICENSE).
