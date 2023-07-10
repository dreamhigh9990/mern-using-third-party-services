import { object, string, ref } from 'yup';

export default object().shape({
  password: string().required('Password is required'),
  passwordConfirm: string()
    .oneOf(
      [ref('password'), null],
      'Password and password confirm should match'
    )
    .required('Password confirm is required')
});
