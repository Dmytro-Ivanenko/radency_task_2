import Table from '../Table/Table';
import Button from '../../shared/components/Button/Button';

import styles from './notesList.module.scss';

const NotesList: React.FC = () => {
  const tableHeadersArr: string[] = [
    'Name',
    'Created',
    'Category',
    'Content',
    'Dates',
  ];

  const createNoteClick = () => {
    console.log('add note');
  };

  return (
    <div className={styles.notesList}>
      <Table tableType="notesList" tableHeaders={tableHeadersArr} />
      <Button onClick={createNoteClick}>Create note</Button>
    </div>
  );
};

export default NotesList;
