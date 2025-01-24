import React from 'react';
import { forwardRef } from '@/internals/utils';
import { useClassNames } from '@/internals/hooks';
import type { WithAsProps } from '@/internals/types';

export interface TabPanelProps extends WithAsProps {
  /** The active state of the tab. */
  active?: boolean;

  /** The HTML id attribute, which should be unique. */
  id?: string;
}

const TabPanel = forwardRef<'div', TabPanelProps>((props, ref) => {
  const {
    as: Component = 'div',
    classPrefix = 'tab-panel',
    children,
    active,
    className,
    ...rest
  } = props;

  const { withClassPrefix, merge } = useClassNames(classPrefix);

  return (
    <Component
      role="tabpanel"
      ref={ref}
      tabIndex={0}
      hidden={!active}
      className={merge(className, withClassPrefix())}
      {...rest}
    >
      {children}
    </Component>
  );
});

TabPanel.displayName = 'TabPanel';

export default TabPanel;
