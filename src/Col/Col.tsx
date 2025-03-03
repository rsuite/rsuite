import React, { useMemo } from 'react';
import omit from 'lodash/omit';
import { forwardRef } from '@/internals/utils';
import { BREAKPOINTS } from '@/internals/constants';
import { useClassNames } from '@/internals/hooks';
import { WithAsProps } from '@/internals/types';
import { useCustom } from '../CustomProvider';
import type { DeprecatedColProps, ColConfig } from './types';

export interface ColProps extends WithAsProps, DeprecatedColProps {
  /** The number of columns or configuration for Extra small devices Phones (< 576px) */
  xs?: number | ColConfig;

  /** The number of columns or configuration for Small devices Tablets (≥ 576px) */
  sm?: number | ColConfig;

  /** The number of columns or configuration for Medium devices Desktops (≥ 768px) */
  md?: number | ColConfig;

  /** The number of columns or configuration for Large devices Desktops (≥ 992px) */
  lg?: number | ColConfig;

  /** The number of columns or configuration for Extra Large devices Desktops (≥ 1200px) */
  xl?: number | ColConfig;

  /** The number of columns or configuration for Extra Extra Large devices Desktops (≥ 1400px) */
  xxl?: number | ColConfig;
}

type ResponsiveKey = 'span' | 'offset' | 'push' | 'pull' | 'hidden';
type LegacyKey = 'Offset' | 'Push' | 'Pull' | 'Hidden';

/**
 * The `Col` component is used for layout and grids.
 * @see https://rsuitejs.com/en/components/grid
 */
const Col = forwardRef<'div', ColProps>((props: ColProps, ref) => {
  const { propsWithDefaults } = useCustom('Col', props);
  const { as: Component = 'div', classPrefix = 'col', className, ...rest } = propsWithDefaults;
  const { prefix, merge, rootPrefix, withClassPrefix } = useClassNames(classPrefix);

  const { colClasses, omitKeys } = useMemo(() => {
    const colClasses = {};
    const omitKeys = {};

    const addResponsiveClasses = (
      size: string,
      value: number | ColConfig | boolean | undefined,
      type: ResponsiveKey
    ) => {
      if (value === undefined) return;

      const classKey =
        type === 'hidden'
          ? rootPrefix(`hidden-${size}`)
          : prefix(`${size}-${type === 'span' ? '' : type + '-'}${value}`);
      colClasses[classKey] = type === 'hidden' ? Boolean(value) : Number(value) >= 0;
    };

    BREAKPOINTS.forEach(size => {
      const value = rest[size];
      omitKeys[size] = null;

      // Handle object-based props
      if (typeof value === 'object' && value !== null) {
        const config = value as ColConfig;
        addResponsiveClasses(size, config.span, 'span');
        addResponsiveClasses(size, config.offset, 'offset');
        addResponsiveClasses(size, config.push, 'push');
        addResponsiveClasses(size, config.pull, 'pull');
        addResponsiveClasses(size, config.hidden, 'hidden');
      } else if (typeof value === 'number') {
        // Handle number-based props (backward compatibility)
        addResponsiveClasses(size, value, 'span');
      }

      // Handle legacy props
      (['Offset', 'Push', 'Pull', 'Hidden'] as LegacyKey[]).forEach(type => {
        const legacyKey = `${size}${type}` as keyof DeprecatedColProps;
        const legacyValue = rest[legacyKey];
        omitKeys[legacyKey] = null;

        if (legacyValue !== undefined) {
          addResponsiveClasses(size, legacyValue, type.toLowerCase() as ResponsiveKey);
        }
      });
    });

    return { colClasses, omitKeys };
  }, [prefix, rootPrefix, ...BREAKPOINTS.map(size => rest[size])]);

  const classes = merge(className, withClassPrefix(), colClasses);
  const unhandledProps = omit(rest, Object.keys(omitKeys));

  return <Component {...unhandledProps} ref={ref} className={classes} />;
});

Col.displayName = 'Col';

export default Col;
