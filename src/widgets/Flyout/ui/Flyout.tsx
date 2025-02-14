import styles from './Flyout.module.scss';
import { useDispatch } from 'react-redux';
import { RootStateType, useAppSelector } from '../../../app/store';
import {
  IPeopleViewState,
  unselectAllPeople,
} from '../../../entities/people/model/peopleViewSlice';
import Button from '../../../shared/Button';

const Flyout = () => {
  const dispatch = useDispatch();

  const { selectedPeople }: IPeopleViewState = useAppSelector<
    RootStateType,
    IPeopleViewState
  >((store): IPeopleViewState => store.peopleView);

  const download = () => {
    if (selectedPeople?.length) {
      const content = [
        'data:text/csv;charset=utf-8,',
        Object.keys(selectedPeople[0]).join(','),
        ...selectedPeople.map((p) =>
          Object.keys(p)
            .map((k) => (p as unknown as Record<string, string>)[k])
            .join(',')
        ),
      ].join('\n');

      const encodedUri = encodeURI(content);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `${selectedPeople.length}_people.csv`);
      document.body.appendChild(link);

      link.click();
    }
  };

  return (
    <div
      className={`${styles.wrapper} ${selectedPeople.length > 0 ? styles.visible : ''}`}
    >
      <span>{`${selectedPeople.length} items selected`}</span>
      <Button
        text={'Unselect all'}
        callback={() => dispatch(unselectAllPeople())}
      />
      <Button text={'Download'} callback={() => download()} />
    </div>
  );
};

export default Flyout;
