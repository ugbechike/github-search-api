import express, { Application } from 'express';
import { appRouter } from '../../routes';
import { appConfig } from '../env';
import { appErrorHandler, configureMiddleware } from '../mw/middleware';

/**
 * @constant {Application}
 */
const app: Application = express();

// Serve assets from the disk path
if (appConfig.isDevelopment) {
  app.use(express.static(`/tmp/${appConfig.name}`));
}

/**
 * @constructs Application Middleware
 */
configureMiddleware(app);

/**
 * @constructs Application Routes
 */
appRouter(app);

/**
 * @constructs Application Error Handler
 */
appErrorHandler(app);

export { app };
