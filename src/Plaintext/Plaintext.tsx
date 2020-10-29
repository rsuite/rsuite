import React from 'react';
import { WithAsProps } from '../@types/common';
import { useClassNames, useCustom } from '../utils';

type LocaleKey = 'unfilled' | 'notSelected' | 'notUploaded';

type PlaintextLocale = Record<LocaleKey, string>;

export interface PlaintextProps extends WithAsProps {
  placeholder?: React.ReactNode;
  localeKey?: LocaleKey;
}

/**
 *  Make the component display in plain text, and display default characters when there is no children.
 */
const Plaintext = React.forwardRef((props: PlaintextProps, ref) => {
  const { locale } = useCustom<PlaintextLocale>('Plaintext');
  const {
    as: Component = 'div',
    classPrefix = 'plaintext',
    className,
    children,
    localeKey,
    placeholder = locale[localeKey],
    ...rest
  } = props;

  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix({ empty: !children }));

  return (
    <Component {...rest} ref={ref} className={classes}>
      {children ? children : placeholder}
    </Component>
  );
});

Plaintext.displayName = 'Plaintext';

export default Plaintext;
