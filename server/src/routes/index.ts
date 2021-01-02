import http from 'http';
import { NOT_FOUND } from 'http-status-codes';
import { Application, NextFunction } from 'express-serve-static-core';

import { IAppRequest } from '../types/app-request';

import { IAppResponse } from '../types/app-response';
import { githubSearchRoute } from '../module/github-search-controller/routes';

const api = '/api';
export function appRouter(app: Application): void {
  app.use(api, githubSearchRoute);

  // Register no route found
  app.use(
    (req: IAppRequest, res: IAppResponse, next: NextFunction): IAppResponse => {
      return res.status(NOT_FOUND).json({
        code: NOT_FOUND,
        message: http.STATUS_CODES[NOT_FOUND],
      });
    },
  );
}
