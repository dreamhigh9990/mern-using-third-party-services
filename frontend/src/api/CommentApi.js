import apisauce from 'apisauce';
import qs from 'qs';

export default (token, { spaceId }) => {
  const api = apisauce.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}/spaces/${spaceId}/comments`,
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
  const create = comment => api.post('', comment);
  const update = (id, comment) => api.put(id, comment);
  const remove = id => api.delete(id);

  return {
    list,
    get,
    create,
    update,
    remove
  };
};
