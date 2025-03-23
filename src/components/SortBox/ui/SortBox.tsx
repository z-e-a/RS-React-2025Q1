import React, { useState } from 'react';

import styles from './SortBox.module.scss';
import Button from '../../Button';

interface SortBoxProps {
  sortingFields: string[];
  sortingField: string;
  setSortingField: (text: string) => void;
  sortingOrder: string;
  setSortingOrder: (text: string) => void;
}

const SortBox = (props: SortBoxProps) => {
  const [localSortingField, setLocalSortingField] = useState<string>(
    props.sortingField
  );
  const [localSortingOrder, setLocalSortingOrder] = useState<string>(
    props.sortingOrder
  );

  const onSelectFieldHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setLocalSortingField(e.currentTarget.value);
  };

  const onSortingOrderChangeHandler = (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    setLocalSortingOrder(e.currentTarget.value);
  };

  const onSortFormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.setSortingField(localSortingField);
    props.setSortingOrder(localSortingOrder);
  };

  return (
    <form className={styles.sortForm} onSubmit={onSortFormSubmitHandler}>
      <h4 className={styles.formHeading}>Sort by...</h4>
      <span className={styles.fieldsCaption}>field:</span>
      <div className={styles.fieldSet}>
        {props.sortingFields.map((field) => {
          return (
            <div className={styles.switchItem} key={field}>
              <input
                id={field}
                type="radio"
                name="field"
                value={field}
                title={field}
                placeholder={field}
                checked={localSortingField == field}
                onChange={onSelectFieldHandler}
              />
              <label htmlFor={field}>{field}</label>
            </div>
          );
        })}
      </div>
      <span
        className={styles.fieldsCaption}
        data-disabled={localSortingField == 'default'}
      >
        order:
      </span>
      <div
        className={styles.fieldSet}
        data-disabled={localSortingField == 'default'}
      >
        <div className={styles.switchItem}>
          <input
            id="ascending"
            type="radio"
            name="order"
            value="ascending"
            title="ascending"
            placeholder="ascending"
            checked={localSortingOrder == 'ascending'}
            onChange={onSortingOrderChangeHandler}
            disabled={localSortingField == 'default'}
          />
          <label htmlFor="ascending">ascending</label>
        </div>

        <div className={styles.switchItem}>
          <input
            id="descending"
            type="radio"
            name="order"
            value="descending"
            title="descending"
            placeholder="descending"
            checked={localSortingOrder == 'descending'}
            onChange={onSortingOrderChangeHandler}
            disabled={localSortingField == 'default'}
          />
          <label htmlFor="descending">descending</label>
        </div>
      </div>
      <Button text={'sort'} submit={true} />
    </form>
  );
};

export default SortBox;
