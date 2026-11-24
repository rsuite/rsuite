import React from 'react';
import omit from 'lodash/omit';
import Box, { BoxProps } from '@/internals/Box';
import { extractBoxProps, omitBoxProps } from '@/internals/Box/utils';
import { forwardRef } from '@/internals/utils';
import { useStyles } from '@/internals/hooks';

export interface SplitterPanelProps extends BoxProps, React.AriaAttributes {
  /** The id used to associate this panel with its resize handle. */
  id?: string;

  /** Minimum share of the available panel space, as a percentage. */
  minSize?: number;

  /** Maximum share of the available panel space, as a percentage. */
  maxSize?: number;

  /** Whether either adjacent handle can resize this panel. */
  resizable?: boolean;
}

/** A content panel in a Splitter. */
const SplitterPanel = forwardRef<'div', SplitterPanelProps>((props, ref) => {
  const {
    as,
    classPrefix = 'splitter-panel',
    className,
    style,
    showFrom,
    hideFrom,
    children,
    layoutStyle,
    contentHidden,
    ...rest
  } = omit(
    props as SplitterPanelProps & {
      layoutStyle?: React.CSSProperties;
      contentHidden?: boolean;
    },
    ['minSize', 'maxSize', 'resizable']
  );
  const { withPrefix, prefix, merge } = useStyles(classPrefix);
  const domProps = omitBoxProps(rest);

  return (
    <Box
      as={as}
      ref={ref}
      role="group"
      className={merge(className, withPrefix())}
      style={layoutStyle}
      {...domProps}
      aria-hidden={contentHidden ? true : domProps['aria-hidden']}
      tabIndex={contentHidden ? -1 : domProps.tabIndex}
    >
      <Box
        className={prefix('content')}
        showFrom={showFrom}
        hideFrom={hideFrom}
        style={contentHidden ? { ...style, display: 'none' } : style}
        {...extractBoxProps(rest)}
      >
        {children}
      </Box>
    </Box>
  );
});

SplitterPanel.displayName = 'SplitterPanel';

export default SplitterPanel;
