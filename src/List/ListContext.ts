import { ListProps } from './List';
import { createContext } from '../utils';
import useManager from './helper/useManager';

export type ListContextType = {
  bordered: boolean;
  size: ListProps['size'];
  register: ReturnType<typeof useManager>['listItemRegister'];
};

const defaultListContext = {
  bordered: false,
  size: 'md',
  manager: null
};

const ListContext = createContext<ListContextType>(defaultListContext);

export default ListContext;
