import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CustomProvider from '../CustomProvider';
import { CardBody, CardFooter, CardHeader } from '../../Card';
import { DrawerActions } from '../../Drawer';
import { ModalFooter } from '../../Modal';
import { NavbarBrand } from '../../Navbar';
import { SidenavBody, SidenavFooter, SidenavGroupLabel, SidenavHeader } from '../../Sidenav';
import { StatHelpText, StatValueUnit } from '../../Stat';

const components = {
  CardBody,
  CardFooter,
  CardHeader,
  DrawerActions,
  ModalFooter,
  NavbarBrand,
  SidenavBody,
  SidenavFooter,
  SidenavGroupLabel,
  SidenavHeader,
  StatHelpText,
  StatValueUnit
};

describe('CustomProvider factory component defaults', () => {
  it.each(Object.entries(components))(
    'applies %s defaults and preserves instance overrides',
    (name, Component) => {
      const onClick = vi.fn();
      const defaults = {
        [name]: { defaultProps: { id: 'global', className: 'configured', onClick } }
      };
      const { rerender } = render(
        <CustomProvider components={defaults}>
          <Component data-testid="target">Content</Component>
        </CustomProvider>
      );
      const target = screen.getByTestId('target');
      expect(target.id).toBe('global');
      expect(target.classList.contains('configured')).toBe(true);
      fireEvent.click(target);
      expect(onClick).toHaveBeenCalledTimes(1);
      rerender(
        <CustomProvider components={defaults}>
          <Component data-testid="target" id="local" className="instance">
            Content
          </Component>
        </CustomProvider>
      );
      expect(screen.getByTestId('target').id).toBe('local');
      expect(screen.getByTestId('target').classList.contains('instance')).toBe(true);
      expect(screen.getByTestId('target').classList.contains('configured')).toBe(false);
    }
  );
});
