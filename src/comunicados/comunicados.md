# Comunicados

- Pertenecen a una Regiduria, Colonia o Calle.
- Los puede emitir un ciudadano que administre una Regiduria, Colonia o Calle.
- Tienen Comentarios que a su vez pueden tener Comentarios (Respuestas).
- Sirven para emitir información ya sea desde el municipio colonia o calle a los ciudadanos suscritos a estos.
- No se pueden emitir comunicados de regidurias, colonias o calles que no estén activas.

## Estructura propuesta:

- id: number;
- ciudadanoId: number; el ciudadano que registró el comunicado.
- regiduriaId: number; la regiduria a la que pertenece el comunicado (si es que es de regiduria)
- coloniaId: number; la colonia a la que pertenece el registro del comunicado
- calleId: number; la calle a la que pertenece el registro del comunicado
- titulo: string;
- comunicado: string;
- createdAt: Date;
- fechaVigencia: Date; No mostrar en tablero de comunicados después de esta fecha

Faltan campos adicionales para más meta datos y control de estos.

## Eventos que generan

### Notificaciones a Ciudadanos

- Cuando se crea
  - Ciudadanos Registrados que tengan activas las notificaciones de comunicados (regiduria, colonia, calle)
  - Administradores Y Moderadores de Municipio (cuando es regiduria)
  - Administradores de Colonia (cuando es de colonia)
  - Administradores de Calle (cuando es de calle)
