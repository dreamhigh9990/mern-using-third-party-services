import apisauce from 'apisauce';

const create = token => {
  const api = apisauce.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}/users`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    responseType: 'json'
  });

  const list = params => api.get('', params);
  const add = data => api.post('', data);
  const update = (id, data) => api.put(id, data);
  const remove = id => api.delete(id);
  const read = id => api.get(id);
  const impersonate = id => api.get(`${id}/impersonate`);

  return {
    list,
    add,
    update,
    remove,
    read,
    impersonate
  };
};

export default create;
