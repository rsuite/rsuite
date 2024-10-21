import React from 'react';
import PropTypes from 'prop-types';
import CloseButton from '@/internals/CloseButton';
import { useClassNames } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import type { WithAsProps, TypeAttributes, RsRefForwardingComponent } from '@/internals/types';
import type { CommonLocale } from '../locales';

export interface TagProps extends WithAsProps {
  /** Different sizes */
  size?: 'lg' | 'md' | 'sm';

  /** A tag can have different colors */
  color?: TypeAttributes.Color;

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
const Tag: RsRefForwardingComponent<'div', TagProps> = React.forwardRef((props: TagProps, ref) => {
  const { propsWithDefaults } = useCustom('Tag', props);
  const {
    as: Component = 'div',
    classPrefix = 'tag',
    size = 'md',
    color = 'default',
    children,
    closable,
    className,
    locale,
    onClose,
    ...rest
  } = propsWithDefaults;

  const { withClassPrefix, prefix, merge } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix(size, color, { closable }));

  return (
    <Component {...rest} ref={ref} className={classes}>
      <span className={prefix`text`}>{children}</span>
      {closable && (
        <CloseButton
          className={prefix`icon-close`}
          onClick={onClose}
          tabIndex={-1}
          locale={{ closeLabel: locale?.remove }}
        />
      )}
    </Component>
  );
});

Tag.displayName = 'Tag';
Tag.propTypes = {
  closable: PropTypes.bool,
  classPrefix: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  as: PropTypes.elementType
};

export default Tag;
