import React from 'react';
import { ListProps } from './List';
import useManager from './helper/useManager';

export type ListContextType = {
  bordered?: boolean;
  size?: ListProps['size'];
  register?: ReturnType<typeof useManager>['listItemRegister'];
};

const ListContext = React.createContext<ListContextType>({
  bordered: false,
  size: 'md'
});

export default ListContext;
