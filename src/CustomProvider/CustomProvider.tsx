import React, { useRef, useMemo } from 'react';
import IconProvider from '@rsuite/icons/IconProvider';
import { usePortal, useIsomorphicLayoutEffect } from '@/internals/hooks';
import { getClassNamePrefix, prefix } from '@/internals/utils';
import { addClass, removeClass, canUseDOM } from '../DOMHelper';
import { CustomContext, CustomProviderProps } from '@/internals/Provider/CustomContext';
import ToastContainer, {
  ToastContainerInstance,
  toastPlacements,
  defaultToasterContainer
} from '../toaster/ToastContainer';

const themes = ['light', 'dark', 'high-contrast'];

/**
 * CustomProvider is used to provide global configuration, such as language, theme, etc.
 *
 * @see https://rsuitejs.com/components/custom-provider
 */
export default function CustomProvider(props: Omit<CustomProviderProps, 'toasters'>) {
  const {
    children,
    classPrefix = getClassNamePrefix(),
    components,
    iconClassPrefix = classPrefix,
    theme,
    toastContainer = defaultToasterContainer,
    disableRipple,
    csp,
    disableInlineStyles,
    ...rest
  } = props;
  const toasters = useRef(new Map<string, ToastContainerInstance>());
  const { Portal } = usePortal({ container: toastContainer, waitMount: true });

  const value = useMemo(
    () => ({ classPrefix, theme, toasters, disableRipple, components, toastContainer, ...rest }),
    [classPrefix, theme, disableRipple, components, toastContainer, rest]
  );

  const iconContext = useMemo(
    () => ({ classPrefix: iconClassPrefix, csp, disableInlineStyles }),
    [iconClassPrefix, csp, disableInlineStyles]
  );

  useIsomorphicLayoutEffect(() => {
    if (canUseDOM && theme) {
      addClass(document.body, prefix(classPrefix, `theme-${theme}`));

      // Remove the className that will cause style conflicts
      themes.forEach(t => {
        if (t !== theme) {
          removeClass(document.body, prefix(classPrefix, `theme-${t}`));
        }
      });
    }
  }, [classPrefix, theme]);

  return (
    <CustomContext.Provider value={value}>
      <IconProvider value={iconContext}>
        {children}
        <Portal>
          <div className={`${classPrefix}toast-provider`}>
            {toastPlacements.map(placement => (
              <ToastContainer
                key={placement}
                placement={placement}
                ref={(ref: any) => {
                  toasters.current.set(placement, ref);
                }}
              />
            ))}
          </div>
        </Portal>
      </IconProvider>
    </CustomContext.Provider>
  );
}
