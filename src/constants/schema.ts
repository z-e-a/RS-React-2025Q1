import * as yup from 'yup';

const userSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required('name is required')
    .matches(/^[A-ZА-Я]+/)
    .defined(),
  age: yup
    .number()
    .required('age is required')
    .min(1, 'age must be positive')
    .defined(),
  gender: yup
    .mixed()
    .required('gender is required')
    .oneOf(['male', 'female'] as const)
    .defined(),
  email: yup.string().required('email is required').email(),
  password1: yup
    .string()
    .min(4, 'The password must be more than 4 characters long')
    .matches(/^(?=.*[0-9])/, 'Password must have at least one digit')
    .matches(
      /^(?=.*[!@#$%^&*(),.?":{}|<>+=])/,
      'Password must have at least one special character'
    )
    .matches(
      /^(?=.*[a-zа-я])/,
      'Password must have at least one lowercased letter'
    )
    .matches(
      /^(?=.*[A-ZА-Я])/,
      'Password must have at least one uppercased letter'
    )
    .required('password is required'),
  password2: yup.string().oneOf([yup.ref('password1')], 'Passwords must much'),
  terms: yup
    .boolean()
    .oneOf([true], 'You have to accept The Terms and Conditions agreement'),
  image: yup.string().required('Image file is required'),
});

export type userSchemaValidationType = yup.InferType<typeof userSchema>;

export default userSchema;
