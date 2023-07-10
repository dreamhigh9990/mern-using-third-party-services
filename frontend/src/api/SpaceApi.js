import apisauce from 'apisauce';
import qs from 'qs';

export default token => {
  const api = apisauce.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}/spaces`,
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
  const light = id => api.get(`${id}/light`);
  const join = id => api.post(`${id}/join`);
  const create = space => api.post('', space);
  const update = (id, space) => api.put(id, space);
  const remove = id => api.delete(id);
  const sendSms = (id, phone) => api.post(`${id}/send-sms`, { phone });

  return {
    list,
    light,
    join,
    get,
    create,
    update,
    remove,
    sendSms
  };
};
