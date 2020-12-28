import {IncomingHttpHeaders} from "http";
import { Request } from 'express-serve-static-core';

export interface IAppHeaders extends IncomingHttpHeaders {}
export interface IAppRequest extends Request {
  headers: IAppHeaders;
}
