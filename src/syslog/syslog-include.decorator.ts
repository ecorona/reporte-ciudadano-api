import { SetMetadata } from '@nestjs/common';
import { SYSLOG_METADATA_KEY } from './constants';
/**
 * Metadatos del evento a almacenar
 */
export class SyslogMetaData {
  ip?: boolean;
  /**
   * El @User() de la solicitud si es que existe uno.
   */
  ciudadano?: boolean;
  url?: boolean;
  /**
   * El método usado en la url de la solicitud (get, post, patch, etc).
   */
  method?: boolean;
  params?: boolean;
  /**
   * El @Query() de la solicitud si es que existe uno.
   */
  query?: boolean;
  userAgent?: boolean;
  /**
   * El @Body() de la solicitud si es que existe uno.
   */
  body?: boolean;
  /**
   * El contenido de la respuesta si es que existe uno.
   */
  response?: boolean;
  constructor(metaData: {
    ip?: boolean;
    ciudadano?: boolean;
    url?: boolean;
    method?: boolean;
    params?: boolean;
    query?: boolean;
    userAgent?: boolean;
    body?: boolean;
    response?: boolean;
  }) {
    this.ip = metaData?.ip || true;
    this.ciudadano = metaData?.ciudadano || true;
    this.url = metaData?.url || true;
    this.method = metaData?.method || true;
    this.params = metaData?.params || true;
    this.query = metaData?.query || true;
    this.userAgent = metaData?.userAgent || true;
    this.response = metaData?.response || false;
    this.body = metaData?.body || false;
  }
}

/**
 * Almacena en la bitácora de syslog los endpoints que se decoren
 * del api con un nombre de evento y los metadatos por default
 * o según se modifique el parámetro metaData.
 *
 * @param {String} eventName Nombre del evento a almacenar
 * @param {SyslogMetaData} metaData Meta-datos del evento a almacenar
 *
 * @property {boolean} body       - El \@Body() de la solicitud si es que existe uno.
 * @property {boolean} user       - El \@User() de la solicitud si es que existe uno.
 * @property {boolean} url        - La URL completa de la solicitud.
 * @property {boolean} method     - El método usado en la url de la solicitud (get, post, patch, etc).
 * @property {boolean} params     - El objeto conteniendo \@Params() de la solicitud
 * @property {boolean} query      - El \@Query() de la solicitud si es que existe uno.
 * @property {boolean} userAgent  - El user-agent en la solicitud.
 * @property {boolean} response   - El contenido de la respuesta si es que existe uno.
 */
export const SyslogInclude = (eventName: string, metaData?: SyslogMetaData) => {
  return SetMetadata(SYSLOG_METADATA_KEY, {
    event: eventName,
    meta: {
      ...new SyslogMetaData(metaData),
    },
  });
};
