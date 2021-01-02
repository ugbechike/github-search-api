import { IAppRequest } from '../../types/app-request';
import { IAppResponse } from '../../types/app-response';
import { redis } from '../../config/redis';
import { appConfig } from '../../config/env';
import { Pipeline } from 'ioredis';
import { Readable } from 'stream';
import { BaseValidationType } from '../../types/base-validator';
import { body } from 'express-validator';
import { reqValidationResult } from '../../config/mw/req-validator-mw';

export interface IRes extends IAppResponse {
  json: (body: { status: string }) => this;
}

export const actionClearSearchCacheValidator: BaseValidationType = [body('search_text').exists(), reqValidationResult];
export async function actionClearCache(req: IAppRequest, res: IRes): Promise<IRes> {
  const { search_text } = req.body;

  /**
   * {Using pipeline instead of sending one command each time, to improve the performance on large scale}
   *
   * when database has a large set of keys,
   * keys command will block the database for several seconds. In that case, scan is more useful.
   * ioredis has scanStream feature to help you iterate over the database easily:
   */
  const stream: Readable = redis.scanStream({
    match: search_text, // update to search_type:searchText
  });

  stream.on('data', async (keys: any) => {
    if (keys.length) {
      const pipeline: Pipeline = redis.pipeline();
      keys.forEach((key: string) => {
        // removing the prefix as pipeline is from same redis instance
        pipeline.del(key.replace(appConfig.redis.prefix, ''));
      });
      await pipeline.exec();
    }
  });

  return res.json({ status: 'ok' });
}
