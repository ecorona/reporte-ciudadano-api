import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CallesService } from './calles.service';
import { CreateCalleDto } from './dto/create-calle.dto';
import { UpdateCalleDto } from './dto/update-calle.dto';
import { Calle } from './entities/calle.entity';
import { SesionCiudadano } from '@root/auth/decorators/sesion-ciudadano.decorator';
import { Ciudadano } from '@root/ciudadanos/entities/ciudadano.entity';
import { EmailService } from '@root/email/email.service';

@Controller('calles')
@ApiTags('calles')
export class CallesController {
  constructor(
    private readonly callesService: CallesService,
    private readonly emailService: EmailService,
  ) {}

  @Post()
  create(@Body() createCalleDto: CreateCalleDto) {
    return this.callesService.create(createCalleDto);
  }

  @Get()
  findAll() {
    return this.callesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.callesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCalleDto: UpdateCalleDto) {
    return this.callesService.update(+id, updateCalleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.callesService.remove(+id);
  }

  @Post('fundar')
  async fundarCalle(
    @Body() body: CreateCalleDto,
    @SesionCiudadano() ciudadano: Ciudadano,
  ): Promise<Calle> {
    const calleFundada = await this.callesService.fundarCalle(
      body.nombre,
      ciudadano.id,
    );

    //se envie un email al fundador

    const emailAEnviar = {
      email: ciudadano.email,
      subject: 'Calle fundada',
      template: 'calle-fundada',
      context: {
        nombreCalle: calleFundada.nombre,
      },
    };

    await this.emailService.enviarEmail(emailAEnviar);

    return calleFundada;
  }
}
