import { Ciudadano } from '../entities/ciudadano.entity';
import { CreateCiudadanoDto } from './create-ciudadano.dto';
import { OpcionesPaginacionCiudadano } from './opciones-paginacion-ciudadano.dto';
import { UpdateCiudadanoDto } from './update-ciudadano.dto';

export interface ICiudadanosService {
  crearCiudadano(createCiudadanoDto: CreateCiudadanoDto): Promise<Ciudadano>;
  paginate(options: OpcionesPaginacionCiudadano): Promise<Ciudadano[]>;
  getById(ciudadanoId: number): Promise<Ciudadano>;
  actualizarCiudadano(
    id: number,
    updateCiudadanoDto: UpdateCiudadanoDto,
    ciudadanoSesion: Ciudadano,
  ): Promise<Ciudadano>;
  // activarCiudadano(ciudadanoId: number): Promise<Ciudadano>;
  // desactivarCiudadano(ciudadanoId: number): Promise<Ciudadano>;
}
