import { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { INote } from '../../shared/models';
import { extractDatesFromText } from '../../services/workWithDate';

import Button from '../../shared/components/Button/Button';
import styles from './table.module.scss';

interface IProps {
  tableType: 'notesList' | 'categoryList';
  tableHeaders: string[];
}

interface ICategoryCounts {
  [category: string]: {
    active: number;
    archived: number;
  };
}

interface ICategorySummary {
  category: string;
  active: number;
  archived: number;
}

// Component
const Table: React.FC<IProps> = ({ tableType, tableHeaders }) => {
  const [noteState, setNoteState] = useState<INote[]>([]);
  const filterValue = useAppSelector(state => state.notesApp.filter);
  const allNoteArr = useAppSelector(state => state.notesApp.notes);
  const filteredArr = useAppSelector(state => {
    return state.notesApp.notes.filter(
      (note: INote) => note.status === filterValue
    );
  });

  useEffect(() => {
    setNoteState(filteredArr);
  }, [filteredArr, filterValue]);

  // Get category count
  const countNotesByCategory = (notes: INote[]): ICategorySummary[] => {
    const categories: ICategoryCounts = {};

    notes.forEach(note => {
      const { category, status } = note;
      if (!categories[category]) {
        categories[category] = { active: 0, archived: 0 };
      }

      if (status === 'archived') {
        categories[category].archived += 1;
      } else {
        categories[category].active += 1;
      }
    });

    return Object.entries(categories).map(([category, counts]) => ({
      category,
      active: counts.active,
      archived: counts.archived,
    }));
  };

  // Click handlers
  const onArchiveAllButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.dir(e);
  };
  const onDeleteAllButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.dir(e);
  };
  const onAddButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.dir(e);
  };
  const onArchiveButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.dir(e);
  };
  const onDeleteButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.dir(e);
  };

  // Get note row markup
  const getNoteRowMarkup: (note: INote) => JSX.Element = ({
    id,
    name,
    content,
    createdAt,
    category,
    editable = false,
  }) => {
    const dates: string = extractDatesFromText(content);
    const categoryForStyle: string = category.split(' ')[0];

    return (
      <tr className={editable ? styles.editable : ''} key={id}>
        <td
          className={`${styles.notesCategoryIcon} ${styles[categoryForStyle]}`}
        ></td>
        <td>
          <input type="text" value={name} name="name" readOnly={!editable} />
        </td>
        <td>{createdAt}</td>
        <td>
          <select name="category" disabled={!editable} value={category}>
            <option value="Task">Task</option>
            <option value="Idea">Idea</option>
            <option value="Random Thought">Random Thought</option>
          </select>
        </td>
        <td>
          <input
            type="text"
            value={content}
            name="content"
            readOnly={!editable}
          />
        </td>
        <td>{dates}</td>
        <td>
          <div>
            <Button
              className={`${styles.notesTableButton} ${styles.notesEditButton}`}
              onClick={onAddButtonClick}
              dataId={id}
            ></Button>
            <Button
              className={`${styles.notesTableButton} ${styles.notesArchiveButton}`}
              onClick={onArchiveButtonClick}
              dataId={id}
            ></Button>
            <Button
              className={`${styles.notesTableButton} ${styles.notes_deleteButton}`}
              onClick={onDeleteButtonClick}
              dataId={id}
            ></Button>
          </div>
        </td>
      </tr>
    );
  };

  //Get category row markup
  const getCategoryRowMarkup: () => JSX.Element[] = () => {
    const categoryArr: ICategorySummary[] = countNotesByCategory(allNoteArr);
    const markup = categoryArr.map(
      ({ category, active, archived }: ICategorySummary, i) => {
        const categoryForStyle: string = category.split(' ')[0];
        return (
          <tr key={i}>
            <td
              className={`${styles.notesCategoryIcon} ${styles[categoryForStyle]}`}
            ></td>
            <td>{category}</td>
            <td>{active}</td>
            <td>{archived}</td>
          </tr>
        );
      }
    );

    return markup;
  };

  return (
    <div>
      <table className="notes_table" id="notesTable">
        <thead>
          <tr>
            <th></th>
            {tableHeaders.map((text, i) => (
              <th key={i}>{text}</th>
            ))}

            {tableType === 'notesList' && (
              <th>
                <div>
                  <Button
                    className={`${styles.notesTableButton} ${styles.notesArchiveButton}`}
                    onClick={onArchiveAllButtonClick}
                  ></Button>
                  <Button
                    className={`${styles.notesTableButton} ${styles.notes_deleteButton}`}
                    onClick={onDeleteAllButtonClick}
                  ></Button>
                </div>
              </th>
            )}
          </tr>
        </thead>
        <tbody id="notesTableBody">
          {tableType === 'notesList' &&
            noteState.map(note => getNoteRowMarkup(note))}
          {tableType === 'categoryList' && getCategoryRowMarkup()}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
