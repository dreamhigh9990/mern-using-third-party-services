import { object, string } from 'yup';

export default object().shape({
  email: string()
    .email('Invalid email address')
    .required('Email is required'),
  name: string().required('Name is required'),
  password: string().required('Password is required')
});
