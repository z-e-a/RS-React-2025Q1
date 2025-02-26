import styles from './Flyout.module.scss';
import Button from '../../Button';
import { SelectionContext } from '@/SelectionContext';
import { useContext } from 'react';

const Flyout = () => {
  const selectionContext = useContext(SelectionContext);

  const uselectAllHandler = () => {
    if (selectionContext?.unselectAllPeople)
      selectionContext.unselectAllPeople();
  };

  const selectionLength = selectionContext?.selectedPeople?.length ?? 0;

  const download = () => {
    if (selectionContext?.selectedPeople?.length) {
      const content = [
        'data:text/csv;charset=utf-8,',
        Object.keys(selectionContext?.selectedPeople[0]).join(','),
        ...selectionContext.selectedPeople.map((p) =>
          Object.keys(p)
            .map((k) => (p as unknown as Record<string, string>)[k])
            .join(',')
        ),
      ].join('\n');

      const encodedUri = encodeURI(content);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('href', encodedUri);
      link.setAttribute(
        'download',
        `${selectionContext.selectedPeople.length}_people.csv`
      );

      link.click();
    }
  };

  return (
    <div
      className={`${styles.wrapper} ${selectionLength > 0 ? styles.visible : ''}`}
    >
      <span>{`${selectionLength} items selected`}</span>
      <Button text={'Unselect all'} callback={uselectAllHandler} />
      <Button text={'Download'} callback={() => download()} />
    </div>
  );
};

export default Flyout;
