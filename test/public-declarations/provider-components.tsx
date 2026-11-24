import React from 'react';
import { CustomProvider, type CustomProviderProps } from 'rsuite';

type Components = NonNullable<CustomProviderProps['components']>;
export const factoryDefaults = {
  CardBody: { defaultProps: { className: 'body' } },
  CardFooter: { defaultProps: { className: 'footer' } },
  CardHeader: { defaultProps: { className: 'header' } },
  DrawerActions: { defaultProps: { className: 'actions' } },
  ModalFooter: { defaultProps: { className: 'footer' } },
  NavbarBrand: { defaultProps: { className: 'brand' } },
  SidenavBody: { defaultProps: { className: 'body' } },
  SidenavFooter: { defaultProps: { className: 'footer' } },
  SidenavGroupLabel: { defaultProps: { className: 'label' } },
  SidenavHeader: { defaultProps: { className: 'header' } },
  StatHelpText: { defaultProps: { className: 'help' } },
  StatValueUnit: { defaultProps: { className: 'unit' } },
  Progress: { defaultProps: { percent: 25 } },
  ProgressLine: { defaultProps: { percent: 50 } },
  Transition: { defaultProps: { in: true } },
  DateRangeInput: { defaultProps: { character: ' to ' } },
  Dialog: { defaultProps: { title: 'Confirm' } },
  SafeAnchor: { defaultProps: { href: '#help' } }
} satisfies Components;
export const provider = <CustomProvider components={factoryDefaults} />;

const invalidClass: Components = {
  CardBody: {
    defaultProps: {
      // @ts-expect-error Factory component defaults retain their actual prop types.
      className: 42
    }
  }
};
const invalidProgress: Components = {
  ProgressLine: {
    defaultProps: {
      // @ts-expect-error The compatible ProgressLine key still uses numeric percent.
      percent: '50'
    }
  }
};
const privateImage: Components = {
  // @ts-expect-error Internal wrappers are not public provider components.
  ImageWrapper: { defaultProps: {} }
};
const privateDrawer: Components = {
  // @ts-expect-error Internal responsive implementation details are excluded.
  NavbarDrawer: { defaultProps: {} }
};
void [invalidClass, invalidProgress, privateImage, privateDrawer];
