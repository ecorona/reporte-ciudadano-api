import { ForbiddenError } from '@casl/ability';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(ForbiddenError)
export class CaslForbiddenErrorFilter implements ExceptionFilter {
  catch(error: ForbiddenError<any>, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = HttpStatus.FORBIDDEN;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: error.message,
      path: request.url,
    });
  }
}
