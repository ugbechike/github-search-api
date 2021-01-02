import { httpPost } from '../utils/api-request';

const ClearSearchCacheUrl = '/api/clear-cache';

export const ClearSearchUserCache = () => {
  it('should clear user cache from redis store with the key', async () => {
    const response: any = await httpPost(ClearSearchCacheUrl, {
      search_text: 'ugbechike',
      search_type: 'users',
    });

    expect(response.status).toEqual(200);
    expect(response.body.status).toBe('ok');
  });

  it('should clear repository cache from redis store with the key', async () => {
    const response: any = await httpPost(ClearSearchCacheUrl, {
      search_text: 'github search',
      search_type: 'repositories',
    });

    expect(response.status).toEqual(200);
    expect(response.body.status).toBe('ok');
  });
};
