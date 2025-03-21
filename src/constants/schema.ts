import * as yup from 'yup';
import { countries } from './countries';
import { imageFileTypes } from '.';

const userSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required('name is required')
    .matches(/^[A-ZА-Я]+/, 'first letter must be uppercased')
    .defined(),
  age: yup
    .number()
    .required('age is required')
    .min(1, 'age must be positive')
    .defined(),
  gender: yup
    // .mixed()
    .string()
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
  password2: yup
    .string()
    .required()
    .oneOf([yup.ref('password1')], 'Passwords must much'),
  country: yup
    .string()
    .required()
    .oneOf(
      countries.map((c) => c.name),
      'country is not valid'
    ),
  terms: yup
    .boolean()
    .required()
    .oneOf([true], 'You have to accept The Terms and Conditions agreement'),
  image: yup
    .mixed<FileList>()
    .required('Image file is required')
    .test('imgSize', 'file size must be less than 100kb', (image) => {
      if (!image.length) return false;
      return image[0].size <= 100000;
    })
    .test('imgFormat', 'only png and jpeg filetypes allowed', (image) => {
      if (!image.length) return false;
      return imageFileTypes.includes(image[0].type);
    }),
});

export type userSchemaValidationType = yup.InferType<typeof userSchema>;

export default userSchema;
