import Table from '../Table/Table';

const CategoryList: React.FC = () => {
  const tableHeadersArr: string[] = ['Note Category', 'Active', 'Archived'];

  return <Table tableType="categoryList" tableHeaders={tableHeadersArr} />;
};

export default CategoryList;
