import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Response } from 'express';
import { ExceptionTemplateError } from './exceptionTemplate.error';
import { ErrorInterface, RequestInterface, ResponseInterface } from 'src/interfaces';
import { LOG4JS_ERROR_LOGGER, Log4jsService } from 'src/shared/log4js';


@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    @Inject(LOG4JS_ERROR_LOGGER)
    protected log: Log4jsService,
  ) {}

  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<RequestInterface<any>>();
    let responseBody: ResponseInterface<any>;

    if (exception instanceof ExceptionTemplateError) {
      const message = exception.getResponse()['message'] || 'Error desconocido';
      responseBody = {
        code: exception.getStatus(),
        message: message, // Mensaje para el cliente
        payload: null, // Aquí puedes asignar null o un mensaje diferente
      };
    } else if (exception instanceof HttpException) {
      const message = exception.getResponse()['message'] || 'Error desconocido';
      responseBody = {
        code: exception.getStatus(),
        message: message, // Mensaje para el cliente
        payload: null, // Aquí puedes asignar null o un mensaje diferente
      };
    } else {
      responseBody = {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
        payload: null, // Aquí también puedes asignar null
      };
    }

    // Registro del error en el log
    const error: ErrorInterface = {
      responseBody: JSON.stringify(responseBody),
      error: `${exception['name'] || 'Error'}: ${exception['message'] || 'Sin mensaje'}`,
      url: request.url,
      body: request.body,
      params: request.params,
      headers: request.headers,
      type: host.getType(),
      requestUser: request.user ? request.user : {},
    };

    this.log.error(JSON.stringify(error), 'ERROR');

    // Responder con el cuerpo del error formateado
    response.status(responseBody.code).json(responseBody);
  }
}


