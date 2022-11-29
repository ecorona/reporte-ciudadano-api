import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SyslogService } from './syslog.service';

@Controller('syslog')
@ApiBearerAuth()
@ApiTags('syslog')
export class SyslogController {
  constructor(private readonly syslogService: SyslogService) {}
  @Get()
  paginate(@Query() options): Promise<any> {
    return this.syslogService.paginate(options);
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.syslogService.getById(id);
  }
}
