import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailService {
  private logger = new Logger(EmailService.name);
  async enviarEmail(data: {
    email: string;
    subject: string;
    template: string;
    context: any;
  }) {
    this.logger.verbose(`Enviando email a: ${data.email}`);
  }
}
