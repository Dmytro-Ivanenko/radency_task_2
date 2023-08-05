import Button from '../../shared/components/Button/Button';

interface IProps {
  tableType: 'notesList' | 'categoryList';
  tableHeaders: string[];
}

// Component
const Table: React.FC<IProps> = ({ tableType, tableHeaders }) => {
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
        <tbody id="notesTableBody"></tbody>
      </table>
    </div>
  );
};

export default Table;
