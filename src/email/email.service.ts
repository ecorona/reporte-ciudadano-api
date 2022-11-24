import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  async enviarEmail(data: {
    email: string;
    subject: string;
    template: string;
    context: any;
  }) {
    console.log('Enviando email a:', data.email);
  }
}
