import morgan from 'morgan';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { Application, NextFunction } from 'express-serve-static-core';
import swaggerUi from 'swagger-ui-express';
import { appConfig } from '../env';
import { IAppRequest } from '../../types/app-request';
import { IAppResponse } from '../../types/app-response';
import { sendHttpErrorModule } from '../error/send-http-error';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { HttpError } from '../../types/http-error';
import cors from 'cors';
import swaggerJson from '../../../swagger/swagger.json';

export function configureMiddleware(app: Application): void {
  app.disable('x-powered-by');

  // custom error
  app.use(sendHttpErrorModule);

  // Do not log http requests if NODE_ENV is testing
  if (!appConfig.isTesting) {
    // http request logger middleware
    app.use(morgan('combined'));
  }

  app.use(cors());

  app.use(
    bodyParser.urlencoded({
      extended: false,
    }),
  );
  app.use(bodyParser.json({ limit: process.env.JSON_MAX_LIMIT ?? '100kb' }));
  // parse Cookie header and populate req.cookies with an object keyed by the cookie names.
  app.use(cookieParser());
  // returns the compression middleware
  app.use(compression());

  // config swagger ui route
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));
}

/**
 * @export
 * @param {Application} app
 */
export function appErrorHandler(app: Application): void {
  app.use((error: Error, req: IAppRequest, res: IAppResponse, next: NextFunction): void => {
    // in case response is already sent
    if (res.headersSent) {
      return;
    }

    if (typeof error === 'number') {
      error = new HttpError(error); // next(404)
    }
    if (error instanceof HttpError) {
      res.sendHttpError(error);
    } else {
      if (appConfig.isDevelopment) {
        error = new HttpError(INTERNAL_SERVER_ERROR, error.message);
        res.sendHttpError(error);
      } else {
        error = new HttpError(INTERNAL_SERVER_ERROR);
        res.sendHttpError(error, error.message);
      }
    }
  });
}
