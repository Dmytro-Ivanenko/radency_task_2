import uniqid from 'uniqid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { useAppSelector, useAppDispatch } from '../../redux/hooks';

import Table from '../Table/Table';
import Button from '../../shared/components/Button/Button';
import { addNote } from '../../redux/slice';
import { getCurrentDateTime } from '../../services/workWithDate';
import { INote } from '../../shared/models';

import styles from './notesList.module.scss';

// Component
const NotesList: React.FC = () => {
  const dispatch = useAppDispatch();
  const filterValue = useAppSelector(state => state.notesApp.filter);
  const tableHeadersArr: string[] = [
    'Name',
    'Created',
    'Category',
    'Content',
    'Dates',
  ];

  const onCreateNoteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newNote: INote = {
      id: uniqid(),
      name: '',
      createdAt: getCurrentDateTime(),
      content: '',
      category: 'Task',
      status: filterValue,
      editable: true,
    };
    try {
      dispatch(addNote(newNote));

      Notify.success('Note added');
    } catch (error) {
      Notify.failure('Error');
    }
  };

  return (
    <div className={styles.notesList}>
      <Table tableType="notesList" tableHeaders={tableHeadersArr} />
      <Button onClick={onCreateNoteClick}>Create note</Button>
    </div>
  );
};

export default NotesList;
