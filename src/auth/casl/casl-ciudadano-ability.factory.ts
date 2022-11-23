import { Calle } from './../../calles/entities/calle.entity';
import {
  InferSubjects,
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Regiduria } from '../../regidurias/entities/regiduria.entity';
import { Reporte } from '../../reportes/entities/reporte.entity';
import { Rol } from '../../auth/roles/rol.enum';
import { Ciudadano } from '../../ciudadanos/entities/ciudadano.entity';
import { Action } from './actions.enum';
import { Colonia } from '../../colonias/entities/colonia.entity';

/**
 * sujetos a los cuales se validan los permisos
 */
export type Subjects =
  | InferSubjects<
      | typeof Ciudadano
      | typeof Reporte
      | typeof Regiduria
      | typeof Calle
      | typeof Colonia
    >
  | 'all';

/**
 * union de que acciones pueden suceder en los sujetos
 */
export type AppAbility = Ability<[Action, Subjects]>;

/**
 * Clase para definir las habilidades de los ciudadanos
 */
@Injectable()
export class CaslCiudadanoAbilityFactory {
  /**
   * Configuración de reglas para el ciudadano
   *
   * @param ciudadano ciudadano que va a ser validado por los permisos
   * @returns
   */
  forCiudadano(ciudadano: Ciudadano) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (ciudadano.roles.includes(Rol.Administrador)) {
      //puede administrar todos los ciudadanos
      can(Action.Manage, Ciudadano);
      can(Action.Manage, Reporte);
      can(Action.Manage, Regiduria);
      //pero no se puede borrar así mismo
      cannot(Action.Delete, Ciudadano, { id: { $eq: ciudadano.id } }).because(
        'No se puede borrar a sí mismo',
      );
      //no puede borrar a regidurias que están activas.
      cannot(Action.Delete, Regiduria, { activo: { $eq: true } }).because(
        'No se pueden borrar regidurias activas',
      );
    } else {
      // puede leer a todos ciudadanos
      can(Action.Read, Ciudadano);
      can(Action.Read, Regiduria);
      can(Action.Read, Reporte);
      //solo puede actualizarse a si mismo
      can(Action.Update, Ciudadano, ['nombres', 'apellidos'], {
        id: { $eq: ciudadano.id },
      });
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
