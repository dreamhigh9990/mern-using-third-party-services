import apisauce from 'apisauce';

export default token => {
  const api = apisauce.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}/profile`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    responseType: 'json'
  });

  const get = () => api.get('/');

  return {
    get
  };
};
