import { Ciudadano } from '@root/ciudadanos/entities/ciudadano.entity';
export class LoginCiudadanoResponse {
  access_token: string;
  ciudadano: Partial<Ciudadano>;
}
