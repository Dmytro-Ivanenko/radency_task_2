import { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { INote } from '../../shared/models';
import { extractDatesFromText } from '../../services/workWithDate';

import styles from './table.module.scss';

import Button from '../../shared/components/Button/Button';

interface IProps {
  tableType: 'notesList' | 'categoryList';
  tableHeaders: string[];
}

// add styles

// Component
const Table: React.FC<IProps> = ({ tableType, tableHeaders }) => {
  const [noteState, setNoteState] = useState<INote[]>([]);
  const noteArr = useAppSelector(state => state.notesApp.notes);

  useEffect(() => {
    setNoteState(noteArr);
  }, [noteArr]);

  // Get note markup
  const getNoteRowMarkup: (note: INote) => JSX.Element = ({
    id,
    name,
    content,
    createdAt,
    category,
    editable = false,
  }) => {
    const dates = extractDatesFromText(content);

    return (
      <tr className={editable ? styles.editable : ''} key={id}>
        <td
          className={`${styles.notes_category_icon} ${styles[category]}`}
        ></td>
        <td>
          <input type="text" value={name} name="name" readOnly={!editable} />
        </td>
        <td>{createdAt}</td>
      </tr>
    );
  };

  const onArchiveAllButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.dir(e);
  };
  const onDeleteAllButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.dir(e);
  };

  return (
    <div>
      <table className="notes_table" id="notesTable">
        <thead>
          <tr>
            {tableHeaders.map((text, i) => (
              <th key={i}>{text}</th>
            ))}

            {tableType === 'notesList' && (
              <th>
                <div>
                  <Button
                    className="notes_archiveAllButton"
                    onClick={onArchiveAllButtonClick}
                  ></Button>
                  <Button
                    className="notes_deleteAllButton"
                    onClick={onDeleteAllButtonClick}
                  ></Button>
                </div>
              </th>
            )}
          </tr>
        </thead>
        <tbody id="notesTableBody">
          {noteState.map(note => getNoteRowMarkup(note))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
