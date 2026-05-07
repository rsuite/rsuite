import type { Meta } from '@storybook/react';
import propTypesToArgTypes from './propTypesToArgTypes';

function createMeta<T>(Component: React.ComponentType<T>): Meta<any> {
  return {
    title: `Components/${Component.displayName}`,
    component: Component,
    parameters: {
      layout: 'padded'
    },
    argTypes: propTypesToArgTypes(Component)
  } as Meta<any>;
}

export default createMeta;
