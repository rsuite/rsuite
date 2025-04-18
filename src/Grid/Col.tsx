import React, { useMemo } from 'react';
import omit from 'lodash/omit';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef } from '@/internals/utils';
import { BREAKPOINTS } from '@/internals/constants';
import { useStyles, useCustom } from '@/internals/hooks';
import type { ResponsiveValue } from '@/internals/types';
import type { DeprecatedColProps } from './types';

type ResponsiveKey = 'span' | 'offset' | 'push' | 'pull' | 'order' | 'hidden';

export interface ColProps extends BoxProps {
  /** Grid column span for different breakpoints */
  span?: number | 'auto' | ResponsiveValue<number | 'auto'>;

  /** Grid column offset for different breakpoints */
  offset?: number | ResponsiveValue<number>;

  /** Grid column push for different breakpoints */
  push?: number | ResponsiveValue<number>;

  /** Grid column pull for different breakpoints */
  pull?: number | ResponsiveValue<number>;

  /** Grid column order for different breakpoints */
  order?: number | ResponsiveValue<number>;

  /** Grid column hidden for different breakpoints */
  hidden?: boolean | ResponsiveValue<boolean>;
}

/**
 * The `Col` component is used for layout and grids.
 * @see https://rsuitejs.com/en/components/grid
 */
const Col = forwardRef<'div', ColProps & DeprecatedColProps>(
  (props: ColProps & DeprecatedColProps, ref) => {
    const { propsWithDefaults } = useCustom('Col', props);
    const {
      as,
      classPrefix = 'col',
      className,
      span,
      offset,
      push,
      pull,
      order,
      hidden,
      ...rest
    } = propsWithDefaults;
    const { prefix, merge, rootPrefix, withPrefix } = useStyles(classPrefix);

    const { colClasses, omitKeys } = useMemo(() => {
      const colClasses = {};
      const omitKeys = {};

      const addResponsiveClasses = (
        size: string,
        value: number | 'auto' | boolean | undefined,
        type: ResponsiveKey
      ) => {
        if (value === undefined) return;

        if (type === 'span' && value === 'auto') {
          colClasses[prefix(`auto-${size}`)] = true;
          return;
        }

        const classKey =
          type === 'hidden'
            ? rootPrefix(`hidden-${size}`)
            : prefix(`${size}-${type === 'span' ? '' : type + '-'}${value}`);

        colClasses[classKey] = type === 'hidden' ? Boolean(value) : Number(value) >= 0;
      };

      // Handle new responsive props format
      const resolve = (
        propValue:
          | number
          | 'auto'
          | boolean
          | ResponsiveValue<number | 'auto' | boolean>
          | undefined,
        type: ResponsiveKey
      ) => {
        if (propValue === undefined) return;

        if (typeof propValue === 'object') {
          // Handle responsive object format
          BREAKPOINTS.forEach(size => {
            const value = (propValue as ResponsiveValue<number | 'auto' | boolean>)[size];
            if (value !== undefined) {
              addResponsiveClasses(size, value, type);
            }
          });
        } else {
          // Handle single value format (applies to xs)
          addResponsiveClasses('xs', propValue, type);
        }
      };

      // Process new format props
      resolve(span, 'span');
      resolve(offset, 'offset');
      resolve(push, 'push');
      resolve(pull, 'pull');
      resolve(order, 'order');
      resolve(hidden, 'hidden');

      // Handle legacy format props
      BREAKPOINTS.forEach(size => {
        const value = rest[size];
        omitKeys[size] = null;

        if (typeof value === 'number') {
          addResponsiveClasses(size, value, 'span');
        }

        // Handle legacy props
        (['Offset', 'Push', 'Pull', 'Hidden'] as const).forEach(type => {
          const legacyKey = `${size}${type}` as keyof DeprecatedColProps;
          const legacyValue = rest[legacyKey];
          omitKeys[legacyKey] = null;

          if (legacyValue !== undefined) {
            addResponsiveClasses(size, legacyValue, type.toLowerCase() as ResponsiveKey);
          }
        });
      });

      return { colClasses, omitKeys };
    }, [
      prefix,
      rootPrefix,
      span,
      offset,
      push,
      pull,
      order,
      hidden,
      ...BREAKPOINTS.map(size => rest[size])
    ]);

    const classes = merge(className, withPrefix(), colClasses);
    const unhandledProps = omit(rest, Object.keys(omitKeys));

    return <Box as={as} {...unhandledProps} ref={ref} className={classes} />;
  }
);

Col.displayName = 'Col';

export default Col;
