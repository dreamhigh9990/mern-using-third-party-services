import apisauce from 'apisauce';
import qs from 'qs';

export default (token, { spaceId }) => {
  const api = apisauce.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}/spaces/${spaceId}/posts`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    responseType: 'json',
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: 'brackets' });
    }
  });

  const list = params => api.get('', params);
  const get = id => api.get(id);
  const create = post => api.post('', post);
  const update = (id, post) => api.put(id, post);
  const remove = id => api.delete(id);
  const batchCreate = batch => api.post('batch-create', batch);

  return {
    list,
    get,
    create,
    update,
    remove,
    batchCreate
  };
};
