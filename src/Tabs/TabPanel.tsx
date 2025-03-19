import React from 'react';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef } from '@/internals/utils';
import { useStyles } from '@/internals/hooks';

export interface TabPanelProps extends BoxProps {
  /** The active state of the tab. */
  active?: boolean;

  /** The HTML id attribute, which should be unique. */
  id?: string;
}

const TabPanel = forwardRef<'div', TabPanelProps>((props, ref) => {
  const { as, classPrefix = 'tab-panel', children, active, className, ...rest } = props;

  const { withPrefix, merge } = useStyles(classPrefix);

  return (
    <Box
      as={as}
      role="tabpanel"
      ref={ref}
      tabIndex={0}
      hidden={!active}
      className={merge(className, withPrefix())}
      {...rest}
    >
      {children}
    </Box>
  );
});

TabPanel.displayName = 'TabPanel';

export default TabPanel;
