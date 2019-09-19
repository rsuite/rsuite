import { createContext } from '../utils';

const ListContext = createContext({
  bordered: false,
  size: 'md',
  manager: null
});

export default ListContext;
