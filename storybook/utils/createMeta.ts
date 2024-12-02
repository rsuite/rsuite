import type { Meta } from '@storybook/react';
import propTypesToArgTypes from './propTypesToArgTypes';

function createMeta<T>(Component: React.ComponentType<T>) {
  return {
    title: `Components/${Component.displayName}`,
    component: Component,
    parameters: {
      layout: 'padded'
    },
    argTypes: propTypesToArgTypes(Component)
  } as unknown as Meta<typeof Component>;
}

export default createMeta;
