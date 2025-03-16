import { useNavigate } from 'react-router-dom';
import styles from './ControlledForm.module.scss';
import { useDispatch } from 'react-redux';
import { addUser } from '../../../entities/users';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import { UserFields } from '../../../constants/UserFields';
import { UserType } from '@/entities/users/model/usersSlice';
import { CountriesState } from '@/entities/countries/model/countriesSlice';
import { RootStateType, useAppSelector } from '../../../app/store';
import userSchema from '../../../constants/schema';
import { readFile } from '../../../utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PasswordStrength from '../../../components/PasswordStrength';

type UserData = Omit<UserType, 'password' | 'source' | 'image'> & {
  password1: string;
  password2: string;
  image: FileList;
};

const ControlledForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { countriesList }: CountriesState = useAppSelector<
    RootStateType,
    CountriesState
  >((store): CountriesState => store.countries);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(userSchema),
  });

  const password = watch('password1');

  const submit = async (data: UserData) => {
    const image = await readFile(data.image[0]);
    const newUser: UserType = {
      ...data,
      source: 'controlled form',
      password: data.password1,
      image: image,
    };

    dispatch(addUser(newUser));
    navigate('/');
    reset();
  };

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Controlled form</h2>
        <form className={styles.form} onSubmit={handleSubmit(submit)}>
          {UserFields.map((field, ind) => (
            <label
              className="input-label"
              key={ind}
              data-error-message={
                errors[field.id as keyof UserData]?.message || ''
              }
            >
              <p className="field-name"> {field.placeHolder}</p>
              {field.type == 'select' ? (
                <select
                  id={field.id}
                  {...register(
                    field.id as keyof Omit<UserType, 'password' | 'source'>
                  )}
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
                  {...register(
                    field.id as keyof Omit<UserType, 'password' | 'source'>
                  )}
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
              {field.id == 'password1' ? (
                <PasswordStrength password={password} />
              ) : null}
            </label>
          ))}

          <Button text="add user" submit disabled={!isValid}></Button>
        </form>
      </div>
    </>
  );
};

export default ControlledForm;
