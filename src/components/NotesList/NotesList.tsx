import Table from '../Table/Table';
import Button from '../../shared/components/Button/Button';

import styles from './notesList.module.scss';

const NotesList: React.FC = () => {
  const createNoteClick = () => {
    console.log('add note');
  };

  return (
    <div className={styles.notesList}>
      <Table tableType="notesList" />
      <Button onClick={createNoteClick}>Create note</Button>
    </div>
  );
};

export default NotesList;

{
  /* <div class="notes_listWrapper">
    <table class="notes_table" id="notesTable">
        <thead>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Created</th>
                <th>Category</th>
                <th>Content</th>
                <th>Dates</th>
                <th>
                    <div>
                        <button class="notes_archiveAllButton"></button>
                        <button class="notes_deleteAllButton"></button>
                    </div>
                </th>
            </tr>
        </thead>
        <tbody id="notesTableBody">
            <!-- This is where the notes will be dynamically generated -->
        </tbody>
    </table>
    <button class="addNoteButton" id="addNote">Create note</button>
</div>  */
}
