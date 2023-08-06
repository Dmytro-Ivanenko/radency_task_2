import { useEffect, useState, useCallback, useMemo } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { INote } from '../../shared/models';
import { extractDatesFromText } from '../../services/workWithDate';
import { updateNote, fillNotes } from '../../redux/slice';

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
  const dispatch = useAppDispatch();

  const filterValue = useAppSelector(state => state.notesApp.filter);
  const allNoteArr = useAppSelector(state => state.notesApp.notes);
  const filteredArr = useMemo(() => {
    return allNoteArr.filter((note: INote) => note.status === filterValue);
  }, [allNoteArr, filterValue]);

  const updateTable = useCallback(() => {
    setNoteState(filteredArr);
  }, [filteredArr]);

  useEffect(() => {
    updateTable();
  }, [allNoteArr, filterValue, updateTable]);

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

  // Event handlers

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const noteId = e.target.dataset.id;
    const newName = e.target.value;

    setNoteState((state: INote[]) =>
      state.map(note =>
        note.id === noteId ? { ...note, name: newName } : note
      )
    );
  };

  const onCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const noteId = e.target.dataset.id;
    const newCategory = e.target.value;

    setNoteState((state: INote[]) =>
      state.map(note =>
        note.id === noteId ? { ...note, category: newCategory } : note
      )
    );
  };

  const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const noteId = e.target.dataset.id;
    const newValue = e.target.value;

    setNoteState((state: INote[]) =>
      state.map(note =>
        note.id === noteId ? { ...note, content: newValue } : note
      )
    );
  };

  const onArchiveAllButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const updatedArr = allNoteArr.map((note: INote) => {
        if (note.status === filterValue) {
          const newStatus = note.status === 'active' ? 'archived' : 'active';
          return { ...note, editable: false, status: newStatus };
        }

        return note;
      });

      dispatch(fillNotes(updatedArr));
      Notify.success('Success');
    } catch (error) {
      Notify.failure('Error');
    }
  };

  const onDeleteAllButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const updatedArr = allNoteArr.filter(
        (note: INote) => note.status !== filterValue
      );

      dispatch(fillNotes(updatedArr));
      Notify.success('Notes deleted');
    } catch (error) {
      Notify.failure('Error');
    }
  };

  const onEditButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const noteId = e.currentTarget.dataset.id;
      const currentNote = noteState.find((note: INote) => note.id === noteId);

      if (!currentNote) {
        return;
      }

      const isEditable = currentNote?.editable === true ? false : true;
      const newNote = { ...currentNote, editable: isEditable };

      if (newNote) {
        dispatch(updateNote(newNote));
      }

      if (!isEditable) {
        Notify.success('Note updated');
      }
    } catch (error) {
      Notify.failure('An error occurred, the item were not added..');
    }
  };

  const onArchiveButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const noteId = e.currentTarget.dataset.id;
      const currentNote = noteState.find((note: INote) => note.id === noteId);

      if (!currentNote) {
        return;
      }

      const newStatus =
        currentNote?.status === 'active' ? 'archived' : 'active';

      const newNote = { ...currentNote, editable: false, status: newStatus };

      if (newNote) {
        dispatch(updateNote(newNote));
      }
      Notify.success('Success');
    } catch (error) {
      Notify.failure('An error occurred..');
    }
  };
  const onDeleteButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const noteId = e.currentTarget.dataset.id;
      const updatedArr = allNoteArr.filter((note: INote) => note.id !== noteId);

      dispatch(fillNotes(updatedArr));
      Notify.success('Note deleted');
    } catch (error) {
      Notify.failure('An error occurred..');
    }
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
          <input
            type="text"
            placeholder="Add name"
            value={name}
            name="name"
            readOnly={!editable}
            onChange={onChangeName}
            data-id={id}
          />
        </td>
        <td>{createdAt}</td>
        <td>
          <select
            name="category"
            disabled={!editable}
            value={category}
            onChange={onCategoryChange}
            data-id={id}
          >
            <option value="Task">Task</option>
            <option value="Idea">Idea</option>
            <option value="Random Thought">Random Thought</option>
          </select>
        </td>
        <td>
          <input
            type="text"
            placeholder="Add content"
            value={content}
            name="content"
            onChange={onChangeContent}
            readOnly={!editable}
            data-id={id}
          />
        </td>
        <td>{dates}</td>
        <td>
          <div>
            <Button
              className={`${styles.notesTableButton} ${styles.notesEditButton}`}
              onClick={onEditButtonClick}
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
      <table className={styles.notesTable} id="notesTable">
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
