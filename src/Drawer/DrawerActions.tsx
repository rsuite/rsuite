import { createComponent, ComponentProps } from '@/internals/utils';

export type DrawerActionsProps = ComponentProps;

const DrawerActions = createComponent<'div', DrawerActionsProps>({ name: 'DrawerActions' });

export default DrawerActions;
