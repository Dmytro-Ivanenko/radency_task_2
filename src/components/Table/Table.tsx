interface IProps {
  tableType: 'notesList' | 'categoryList';
}

// Component
const Table: React.FC<IProps> = ({ tableType }) => {
  return <div> TableType: {tableType}</div>;
};

export default Table;
