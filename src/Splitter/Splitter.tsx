import React, { useEffect } from 'react';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef } from '@/internals/utils';
import { useControlled, useCustom, useStyles, useUniqueId } from '@/internals/hooks';
import SplitterPanel, { type SplitterPanelProps } from './SplitterPanel';
import useSplitterResize, { type SplitterResizeCallback } from './useSplitterResize';
import { initialSizes, normalizeSizes, resizeBounds, validLimits, validSizes } from './utils';

export interface SplitterProps extends Omit<BoxProps, 'onResize'> {
  /** Direct Splitter.Panel children. */
  children?: React.ReactNode;

  /** Layout direction of the panels. */
  orientation?: 'horizontal' | 'vertical';

  /** Controlled panel sizes, in percentages that add up to 100. */
  sizes?: number[];

  /** Initial panel sizes in percentages. Defaults to equal shares. */
  defaultSizes?: number[];

  /** Disable all resize handles. */
  disabled?: boolean;

  /** Percentage points to resize by with an arrow key. Shift multiplies this by 10. */
  keyboardStep?: number;

  /** The root element id. */
  id?: string;

  /** Override the layout direction supplied by CustomProvider. */
  dir?: 'ltr' | 'rtl';

  /** Called when a pointer or keyboard resize starts. */
  onResizeStart?: SplitterResizeCallback;

  /** Called with the next panel percentages while resizing. */
  onResize?: SplitterResizeCallback;

  /** Called after pointerup, pointercancel, lost pointer capture, or a keyboard step.
   * Prop changes, keyboard takeover, and unmount discard an active pointer gesture
   * without its end callback.
   */
  onResizeEnd?: SplitterResizeCallback;
}

const Subcomponents = { Panel: SplitterPanel };

/**
 * Resizable panels for workspace layouts.
 * @see https://rsuitejs.com/components/splitter
 */
const Splitter = forwardRef<'div', SplitterProps, typeof Subcomponents>((props, ref) => {
  const { propsWithDefaults, rtl: providerRTL } = useCustom('Splitter', props);
  const {
    as,
    classPrefix = 'splitter',
    className,
    children,
    orientation = 'horizontal',
    sizes: sizesProp,
    defaultSizes,
    disabled = false,
    keyboardStep = 1,
    id: idProp,
    dir,
    onResizeStart,
    onResize,
    onResizeEnd,
    ...rest
  } = propsWithDefaults;
  const id = useUniqueId('rs-splitter-', idProp);
  const rtl = dir ? dir === 'rtl' : providerRTL;
  const { withPrefix, prefix, merge } = useStyles(classPrefix);
  const allChildren = React.Children.toArray(children);
  const panels = allChildren.filter(
    (child): child is React.ReactElement<SplitterPanelProps> =>
      React.isValidElement(child) && child.type === SplitterPanel
  );
  const limits = panels.map(({ props }) => ({
    min: props.minSize ?? 0,
    max: props.maxSize ?? 100,
    resizable: props.resizable !== false
  }));
  const [rawSizes, setSizes, controlled] = useControlled(
    sizesProp,
    initialSizes(defaultSizes, limits)
  );
  const sizes =
    rawSizes.length === panels.length
      ? normalizeSizes(rawSizes, panels.length)
      : initialSizes(undefined, limits);
  const constraintsValid = !panels.length || (validLimits(limits) && validSizes(sizes, limits));
  const sizesValid =
    !controlled ||
    (sizesProp!.length === panels.length &&
      sizesProp!.every(size => Number.isFinite(size) && size >= 0) &&
      Math.abs(sizesProp!.reduce((sum, size) => sum + size, 0) - 100) < 0.000001);
  const configuration = JSON.stringify([
    orientation,
    rtl,
    disabled,
    !constraintsValid || !sizesValid,
    panels.map(panel => panel.key),
    limits
  ]);
  const resize = useSplitterResize({
    sizes,
    limits,
    disabled: disabled || !constraintsValid || !sizesValid,
    orientation,
    rtl,
    keyboardStep,
    configuration,
    setSizes,
    onResizeStart,
    onResize,
    onResizeEnd
  });

  useEffect(() => {
    if (!controlled && rawSizes.length !== panels.length) {
      setSizes(initialSizes(undefined, limits));
    }
  }, [controlled, rawSizes.length, panels.length, setSizes]);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      if (panels.length !== allChildren.length)
        console.warn('Splitter only supports direct Splitter.Panel children.');
      if (!constraintsValid || !sizesValid)
        console.warn(
          'Splitter sizes must add up to 100 and satisfy every panel minSize/maxSize. Resizing is disabled for invalid layouts.'
        );
    }
  }, [panels.length, allChildren.length, constraintsValid, sizesValid]);

  return (
    <Box
      as={as}
      ref={ref}
      id={id}
      dir={rtl ? 'rtl' : 'ltr'}
      className={merge(className, withPrefix())}
      data-orientation={orientation}
      data-resizing={resize.activeHandle !== null || undefined}
      {...rest}
    >
      {panels.map((panel, index) => {
        const panelId = panel.props.id ?? `${id}-panel-${index}`;
        const handleDisabled = index < panels.length - 1 && resize.isDisabled(index);
        const bounds = index < panels.length - 1 ? resizeBounds(sizes, limits, index) : undefined;
        return (
          <React.Fragment key={panel.key}>
            {React.cloneElement(
              panel as React.ReactElement<
                SplitterPanelProps & {
                  layoutStyle?: React.CSSProperties;
                  contentHidden?: boolean;
                }
              >,
              {
                id: panelId,
                contentHidden: sizes[index] === 0,
                layoutStyle: {
                  flexGrow: sizes[index],
                  flexShrink: 0,
                  flexBasis: 0
                }
              }
            )}
            {bounds && (
              <div
                className={prefix('handle')}
                role="separator"
                tabIndex={handleDisabled ? -1 : 0}
                aria-disabled={handleDisabled || undefined}
                aria-orientation={orientation === 'horizontal' ? 'vertical' : 'horizontal'}
                aria-controls={panelId}
                aria-label={panel.props['aria-label']}
                aria-labelledby={panel.props['aria-labelledby']}
                aria-valuemin={handleDisabled ? 0 : bounds.min}
                aria-valuemax={handleDisabled ? 100 : bounds.max}
                aria-valuenow={sizes[index]}
                data-active={resize.activeHandle === index || undefined}
                onPointerDown={event => resize.onPointerDown(index, event)}
                onPointerMove={resize.onPointerMove}
                onPointerUp={resize.onPointerEnd}
                onPointerCancel={resize.onPointerEnd}
                onLostPointerCapture={resize.onPointerEnd}
                onKeyDown={event => resize.onKeyDown(index, event)}
              />
            )}
          </React.Fragment>
        );
      })}
    </Box>
  );
}, Subcomponents);

Splitter.displayName = 'Splitter';

export default Splitter;
