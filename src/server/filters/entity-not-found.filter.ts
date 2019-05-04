import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

@Catch(EntityNotFoundError)
export class EntityNotFoundErrorFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    console.error(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const message: string = exception.message;

    const body: any = {
      statusCode: 404,
      message,
    };

    // TODO could definitely clean this up
    const parts = message.split('matching: ');
    if (parts.length > 1) {
      try {
        const possibleJSON = parts.pop();
        body.criteria = JSON.parse(possibleJSON);
        body.message = parts.join('matching criteria') + 'matching criteria';
      } catch (e) {
        // don't do anything, just go with original message
      }
    }

    response.status(404).json(body);
  }
}
