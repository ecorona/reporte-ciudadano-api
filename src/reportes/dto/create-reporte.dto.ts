import {
  IsInt,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateReporteDto {
  @IsLatitude()
  @IsOptional()
  lat: number;
  @IsLongitude()
  @IsOptional()
  lng: number;
  @IsString()
  @IsNotEmpty()
  descripcion: string;
  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  tipoReporteId: number;
}
