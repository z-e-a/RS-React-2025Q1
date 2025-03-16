import { useNavigate } from 'react-router-dom';
import styles from './UncontrolledForm.module.scss';
import { useDispatch } from 'react-redux';
import { addUser } from '../../../entities/users';
import { FormEvent, useState } from 'react';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import { UserFields } from '../../../constants/UserFields';

const initialState: { [key: string]: string | number | boolean } = {
  name: '',
  email: '',
  age: 0,
  password1: '',
  password2: '',
  gender: 'male',
  country: 'Russia',
  terms: false,
  image: '',
};

const UncontrolledForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const {
        name,
        email,
        age,
        password1,
        password2,
        gender,
        country,
        terms,
        image,
      } = localState;

      console.log(password2, terms);

      dispatch(
        addUser({
          name: name.toString(),
          email: email.toString(),
          age: parseInt(age.toString()),
          password: password1.toString(),
          gender: gender.toString(),
          country: country.toString(),
          terms: true,
          image: image.toString(),
          source: 'uncontrolled form',
        })
      );
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const [localState, setLocalState] = useState(initialState);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setLocalState({
      ...localState,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Uncontrolled form</h2>
        <form className={styles.form} onSubmit={(e) => onSubmit(e)}>
          {UserFields.map((field, ind) => (
            <label className="input-label" key={ind} data-error-message={''}>
              <p className="field-name">
                {(!!localState[field.id] || field.type == 'checkbox') &&
                  field.placeHolder}
              </p>
              {field.type == 'select' ? (
                <select
                  id={field.id}
                  value={localState[field.id].toString()}
                  className={styles['coutnry-select']}
                  onChange={onChangeHandler}
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
                  type={field.type}
                  value={localState[field.id].toString()}
                  className={styles['input-field']}
                  placeholder={field.placeHolder}
                  onChange={onChangeHandler}
                />
              )}
            </label>
          ))}

          <Button text="add user" submit></Button>
        </form>
      </div>
    </>
  );
};

export default UncontrolledForm;
