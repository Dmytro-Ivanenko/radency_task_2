import { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { changeFilter } from '../../redux/slice';

import styles from './filter.module.scss';

//Component
const Filter: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('active');
  const dispatch = useAppDispatch();

  const changeFilterHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilter = e.target.value;
    setSelectedFilter(newFilter);

    if (newFilter === 'active' || newFilter === 'archived') {
      dispatch(changeFilter(newFilter));
    }
  };

  return (
    <form className={styles.filter}>
      <input
        className={styles.filter_input}
        id="activeNotes"
        type="radio"
        name="notesFilter"
        value="active"
        checked={selectedFilter === 'active'}
        onChange={changeFilterHandler}
        defaultChecked
      />
      <label className={styles.filter_label} htmlFor="activeNotes">
        Active
      </label>

      <input
        className={styles.filter_input}
        id="archivedNotes"
        type="radio"
        name="notesFilter"
        value="archived"
        checked={selectedFilter === 'archived'}
        onChange={changeFilterHandler}
      />
      <label className={styles.filter_label} htmlFor="archivedNotes">
        Archived
      </label>
    </form>
  );
};

export default Filter;
