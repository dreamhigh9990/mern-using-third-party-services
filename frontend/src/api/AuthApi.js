import apisauce from 'apisauce';

export default () => {
  const api = apisauce.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}/auth`,
    headers: {
      'Content-Type': 'application/json'
    },
    responseType: 'json'
  });

  const login = (email, password) =>
    api.post('login', {
      email,
      password
    });
  const signup = userData => api.post('signup', userData);
  const checkEmail = email => api.post('check-email', { email });
  const checkSlug = slug => api.post('check-slug', { slug });

  const requestResetPassword = email =>
    api.post('request-reset-password', {
      email
    });
  const resetPassword = (token, password) =>
    api.post('reset-password', {
      token,
      password
    });

  const verifyEmail = token =>
    api.post('verify-email', {
      token
    });
  const sendVerificationEmail = () => api.post('send-verification-email');

  return {
    login,
    signup,
    requestResetPassword,
    resetPassword,
    verifyEmail,
    sendVerificationEmail,
    checkEmail,
    checkSlug
  };
};
