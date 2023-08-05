import { Provider } from 'react-redux';
import { store } from './redux/store';

import Filter from './components/Filter/Filter';
import NotesList from './components/NotesList/NotesList';
import CategoryList from './components/CategoryList/CategoryList';

const App = () => (
  <Provider store={store}>
    <Filter />
    <NotesList />
    <CategoryList />
  </Provider>
);

export default App;
