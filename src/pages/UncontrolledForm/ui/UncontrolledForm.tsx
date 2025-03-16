import { useNavigate } from 'react-router-dom';
import styles from './UncontrolledForm.module.scss';
import { useDispatch } from 'react-redux';
import { addUser } from '../../../entities/users';
import {
  FormEvent,
  MutableRefObject,
  RefObject,
  useRef,
  useState,
} from 'react';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import { UserFields } from '../../../constants/UserFields';
import { UserType } from '@/entities/users/model/usersSlice';
import { CountriesState } from '@/entities/countries/model/countriesSlice';
import { RootStateType, useAppSelector } from '../../../app/store';
import userSchema from '../../../constants/schema';
import { ValidationError } from 'yup';
import { imageFileTypes } from '../../../constants';
import { readFile, trowCustomValidationError } from '../../../utils';

// const initialState: { [key: string]: string | number | boolean } = {
//   name: '',
//   email: '',
//   age: 0,
//   password1: '',
//   password2: '',
//   gender: 'male',
//   country: 'Russia',
//   terms: false,
//   image: '',
// };

const emptyErrors = {
  name: '',
  email: '',
  age: '',
  password1: '',
  password2: '',
  gender: '',
  country: '',
  terms: '',
  image: '',
};

const UncontrolledForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { countriesList }: CountriesState = useAppSelector<
    RootStateType,
    CountriesState
  >((store): CountriesState => store.countries);

  // const refs = UserFields.reduce(
  //   (res, curr) => ({
  //     ...res,
  //     [curr.id]: useRef<HTMLInputElement | null>(null),
  //   }),
  //   {}
  // );

  const [errors, setErrors] = useState<typeof emptyErrors>(emptyErrors);

  const refs: {
    [key: string]: MutableRefObject<
      HTMLInputElement | HTMLSelectElement | null
    >;
  } = {
    name: useRef<HTMLInputElement | null>(null),
    age: useRef<HTMLInputElement | null>(null),
    email: useRef<HTMLInputElement | null>(null),
    password1: useRef<HTMLInputElement | null>(null),
    password2: useRef<HTMLInputElement | null>(null),
    gender: useRef<HTMLInputElement | null>(null),
    country: useRef<HTMLSelectElement | null>(null),
    terms: useRef(null),
    image: useRef<HTMLInputElement | null>(null),
  };

  // const autoCompleteCoutnry = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // const {
      //   name,
      //   email,
      //   age,
      //   password1,
      //   password2,
      //   gender,
      //   country,
      //   terms,
      //   image,
      // } = localState;

      // console.log(password2, terms);

      // dispatch(
      //   addUser({
      //     name: name.toString(),
      //     email: email.toString(),
      //     age: parseInt(age.toString()),
      //     password: password1.toString(),
      //     gender: gender.toString(),
      //     country: country.toString(),
      //     terms: true,
      //     image: image.toString(),
      //     source: 'uncontrolled form',
      //   })
      // );

      const newUser: UserType & { password1: string; password2: string } = {
        source: 'uncontrolled form',
        name: refs.name.current?.value ?? '',
        email: refs.email.current?.value ?? '',
        age: parseInt(refs.age.current?.value ?? '') ?? 0,
        // password: refs.password1.current?.value ?? '',
        password: refs.password1.current?.value ?? '',
        password1: refs.password1.current?.value ?? '',
        password2: refs.password2.current?.value ?? '',
        gender: refs.gender.current?.value ?? '',
        country: refs.country.current?.value ?? '',
        terms: (refs.terms.current as HTMLInputElement)?.checked,
        // image: refs.image.current?.files ? refs.image.current.files[0] : null;
        image: refs.image.current?.value ?? '',
      };

      // const newUser: UserType = {};
      // refs.map

      // console.log(refs.image.current?.value);
      // console.log((refs.image.current as HTMLInputElement).files);

      await userSchema.validate(newUser, { abortEarly: false });

      const inputFiles = (refs.image.current as HTMLInputElement).files;
      if (inputFiles && inputFiles[0].size > 100000) {
        trowCustomValidationError('image', 'file size must be less than 100kb');
      }
      // // console.log(inputFiles && inputFiles[0].type);
      if (inputFiles && !imageFileTypes.includes(inputFiles[0].type)) {
        trowCustomValidationError(
          'image',
          'only png and jpeg filetypes allowed'
        );
      }

      if (inputFiles) {
        // const result = await readFile(inputFiles[0]);
        // console.log(result);
        newUser.image = await readFile(inputFiles[0]);
      }

      console.log(newUser);

      dispatch(addUser(newUser));

      navigate('/');
    } catch (error) {
      // console.log(errors);
      // console.log(error);

      if (error instanceof ValidationError) {
        // error.inner.forEach( (err) =>
        //   errors
        // )
        // const validationErrors = error.inner.reduce(
        //   (res, err) => ({
        //     ...res,
        //     [String((err as ValidationError).path)]: err.message,
        //   }),
        //   {}
        // );
        // setErrors(validationErrors);

        setErrors(
          error.inner.reduce(
            (res, err) => ({
              ...res,
              [String((err as ValidationError).path)]: err.message,
            }),
            {} as typeof emptyErrors
          )
        );
      }
      console.log(error);
    }
  };

  // const [localState, setLocalState] = useState(initialState);

  // const onChangeHandler = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  // ) => {
  //   // setLocalState({
  //   //   ...localState,
  //   //   [e.currentTarget.id]: e.currentTarget.value,
  //   // });
  // };

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Uncontrolled form</h2>
        <form className={styles.form} onSubmit={(e) => onSubmit(e)}>
          {UserFields.map((field, ind) => (
            <label
              className="input-label"
              key={ind}
              data-error-message={
                errors[field.id as keyof typeof emptyErrors] || ''
              }
            >
              <p className="field-name">
                {/* {(!!refs[field.id].current?.value ||
                  field.type == 'checkbox' ||
                  field.type == 'file') &&
                  field.placeHolder} */}
                {/* {refs[field.id].current?.value} */}
                {field.placeHolder}
              </p>
              {field.type == 'select' ? (
                <select
                  id={field.id}
                  ref={refs[field.id] as RefObject<HTMLSelectElement>}
                  // value={localState[field.id].toString()}
                  // className={styles['coutnry-select']}
                  // onChange={onChangeHandler}
                >
                  {field.options?.map((opt, idx) => (
                    <option value={opt} key={idx}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={field.id}
                  ref={refs[field.id] as RefObject<HTMLInputElement>}
                  type={field.type}
                  // value={localState[field.id].toString()}
                  className={styles['input-field']}
                  placeholder={field.placeHolder}
                  // onChange={onChangeHandler}
                  accept={field.type == 'file' ? '.jpeg,.jpg,.png' : undefined}
                  list={field.id == 'country' ? 'countries' : undefined}
                />
              )}
              {field.id == 'country' ? (
                <datalist id="countries">
                  {countriesList.map((country) => {
                    return <option key={country.code} value={country.name} />;
                  })}
                </datalist>
              ) : null}
            </label>
          ))}

          <Button text="add user" submit></Button>
        </form>
      </div>
    </>
  );
};

export default UncontrolledForm;
