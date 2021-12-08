import React from 'react';
import noop from 'lodash/noop';
import { ListProps } from './List';
import useManager from './helper/useManager';

export type ListContextType = {
  bordered?: boolean;
  size?: ListProps['size'];
  register: ReturnType<typeof useManager>['listItemRegister'];
};

const ListContext = React.createContext<ListContextType>({
  bordered: false,
  size: 'md',
  register: () => ({ unregister: noop })
});

export default ListContext;
