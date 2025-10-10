import React from 'react';
import { ListProps } from './List';
import useManager from './helper/useManager';
export type ListContextType = {
    bordered?: boolean;
    size?: ListProps['size'];
    register: ReturnType<typeof useManager>['listItemRegister'];
};
declare const ListContext: React.Context<ListContextType>;
export default ListContext;
