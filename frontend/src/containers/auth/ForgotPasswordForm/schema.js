import { object, string } from 'yup';

export default object().shape({
  email: string()
    .email('Invalid email address')
    .required('Email is required')
});
