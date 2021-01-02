// @ts-ignore
import request, { Request } from 'supertest';
import { app } from '../../src/config/server/server';

export async function httpPost(url: string, body: Record<string, any>, headers: Record<string, string> = {}): Promise<Request> {
  const httpRequest: Request = request(app).post(url);
  httpRequest.set('Accept', 'application/json');
  for (const key in headers) {
    if (headers.hasOwnProperty(key)) {
      httpRequest.set(key, headers[key]);
    }
  }
  httpRequest.send(body);
  return httpRequest;
}

export async function httpGet(url: string, queryParams: string): Promise<Request> {
  const httpRequest: Request = request(app).get(url).query(queryParams);
  httpRequest.set('Accept', 'application/json');
  httpRequest.send();
  return httpRequest;
}
