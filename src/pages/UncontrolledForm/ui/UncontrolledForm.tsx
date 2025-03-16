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
import { readFile, trowCustomValidationError } from '../../../utils';

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

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const newUser: Omit<UserType, 'image'> & {
        password1: string;
        password2: string;
        image: string | FileList;
      } = {
        source: 'uncontrolled form',
        name: refs.name.current?.value ?? '',
        email: refs.email.current?.value ?? '',
        age: parseInt(refs.age.current?.value ?? '') ?? 0,
        password: refs.password1.current?.value ?? '',
        password1: refs.password1.current?.value ?? '',
        password2: refs.password2.current?.value ?? '',
        gender: refs.gender.current?.value ?? '',
        country: refs.country.current?.value ?? '',
        terms: (refs.terms.current as HTMLInputElement)?.checked,
        image: (refs.image.current as HTMLInputElement).files ?? '',
      };

      await userSchema.validate(newUser, { abortEarly: false });

      const inputFiles = (refs.image.current as HTMLInputElement).files;
      if (!inputFiles) {
        trowCustomValidationError('image', 'image file is required');
        return;
      }
      dispatch(addUser({ ...newUser, image: await readFile(inputFiles[0]) }));
      navigate('/');
    } catch (error) {
      if (error instanceof ValidationError) {
        setErrors(
          error.inner.reduce(
            (res, err) => ({
              ...res,
              [String(err.path)]: err.message,
            }),
            {} as typeof emptyErrors
          )
        );
      }
      console.log(error);
    }
  };

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
              <p className="field-name"> {field.placeHolder}</p>
              {field.type == 'select' ? (
                <select
                  id={field.id}
                  ref={refs[field.id] as RefObject<HTMLSelectElement>}
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
                  className={styles['input-field']}
                  placeholder={field.placeHolder}
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
