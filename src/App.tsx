import Filter from './components/Filter/Filter';
import NotesList from './components/NotesList/NotesList';
import CategoryList from './components/CategoryList/CategoryList';

const App: React.FC = () => (
  <>
    <Filter />
    <NotesList />
    <CategoryList />
  </>
);

export default App;
