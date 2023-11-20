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

    //retornar un uuid falso
    return '9eac29b0-292b-4106-a166-97645a42a023';
  }
}
