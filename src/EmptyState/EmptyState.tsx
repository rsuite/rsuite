import React from 'react';
import Box, { BoxProps } from '@/internals/Box';
import { useCustom, useStyles } from '@/internals/hooks';
import { forwardRef } from '@/internals/utils';

export interface EmptyStateProps extends Omit<BoxProps, 'title'> {
  /** The heading describing the empty state. */
  title?: React.ReactNode;

  /** Additional guidance, such as how to change a search or create an item. */
  description?: React.ReactNode;

  /** A decorative icon or illustration. Put interactive content in `children`. */
  icon?: React.ReactNode;

  /** The size of the empty state. @default 'md' */
  size?: 'sm' | 'md' | 'lg';

  /** Align content to the logical start or center. @default 'center' */
  align?: 'start' | 'center';

  /** The heading level, matching the surrounding page hierarchy. @default 3 */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
}

const hasContent = (node: React.ReactNode) => node != null && typeof node !== 'boolean';

/** Present an empty resource with an explanation and optional recovery actions. */
const EmptyState = forwardRef<'div', EmptyStateProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('EmptyState', props);
  const {
    as,
    classPrefix = 'empty-state',
    className,
    title,
    description,
    icon,
    children,
    size = 'md',
    align = 'center',
    headingLevel = 3,
    ...rest
  } = propsWithDefaults;
  const { merge, prefix, withPrefix } = useStyles(classPrefix);
  const Title = `h${headingLevel}` as `h${1 | 2 | 3 | 4 | 5 | 6}`;

  return (
    <Box
      as={as}
      ref={ref}
      className={merge(className, withPrefix())}
      data-size={size}
      data-align={align}
      {...rest}
    >
      {hasContent(icon) && (
        <div className={prefix('icon')} aria-hidden="true">
          {icon}
        </div>
      )}
      {hasContent(title) && <Title className={prefix('title')}>{title}</Title>}
      {hasContent(description) && <div className={prefix('description')}>{description}</div>}
      {hasContent(children) && <div className={prefix('actions')}>{children}</div>}
    </Box>
  );
});

EmptyState.displayName = 'EmptyState';

export default EmptyState;
