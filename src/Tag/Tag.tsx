import React, { useMemo } from 'react';
import CloseButton from '@/internals/CloseButton';
import { useClassNames } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import { forwardRef, mergeStyles, isPresetColor, createColorVariables } from '@/internals/utils';
import type { WithAsProps, Color } from '@/internals/types';
import type { CommonLocale } from '../locales';

export interface TagProps extends WithAsProps {
  /** Different sizes */
  size?: 'lg' | 'md' | 'sm';

  /** A tag can have different colors */
  color?: Color | React.CSSProperties['color'];

  /** Whether to close */
  closable?: boolean;

  /** The content of the component */
  children?: React.ReactNode;

  /** Custom locale */
  locale?: CommonLocale;

  /** Click the callback function for the Close button */
  onClose?: (event: React.MouseEvent<HTMLElement>) => void;
}

/**
 * The `Tag` component is used to label and categorize.
 * It can be used to mark the status of an object or classify it into different categories.
 *
 * @see https://rsuitejs.com/components/tag
 */
const Tag = forwardRef<'div', TagProps>((props: TagProps, ref) => {
  const { propsWithDefaults, getLocale } = useCustom('Tag', props);
  const {
    as: Component = 'div',
    classPrefix = 'tag',
    size = 'md',
    color,
    children,
    closable,
    className,
    locale: overrideLocale,
    style,
    onClose,
    ...rest
  } = propsWithDefaults;

  const { remove } = getLocale('common', overrideLocale);
  const { withClassPrefix, prefix, merge } = useClassNames(classPrefix);
  const classes = merge(
    className,
    withClassPrefix(size, isPresetColor(color) && color, { closable })
  );

  const styles = useMemo(
    () => mergeStyles(style, createColorVariables(color, '--rs-tag-bg', '--rs-tag-text')),
    [style, color]
  );

  return (
    <Component ref={ref} className={classes} style={styles} {...rest}>
      <span className={prefix`text`}>{children}</span>
      {closable && (
        <CloseButton
          className={prefix`icon-close`}
          onClick={onClose}
          tabIndex={-1}
          locale={{ closeLabel: remove }}
        />
      )}
    </Component>
  );
});

Tag.displayName = 'Tag';

export default Tag;
