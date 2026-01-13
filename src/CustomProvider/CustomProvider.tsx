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
import DialogContainer, { DialogContainerInstance } from '../useDialog/DialogContainer';

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
    iconClassPrefix = classPrefix,
    theme,
    toastContainer = defaultToasterContainer,
    csp,
    disableInlineStyles,
    ...rest
  } = props;
  const toasters = useRef(new Map<string, ToastContainerInstance>());
  // This creates a ref that matches the expected type in CustomContext
  const dialogContainerRef = useRef<DialogContainerInstance>(null);
  const { Portal } = usePortal({ container: toastContainer, waitMount: true });

  const value = useMemo(
    () => ({ classPrefix, csp, theme, toasters, toastContainer, ...rest }),
    [classPrefix, csp, theme, toastContainer, rest]
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

  // Create a context value with proper types
  const contextValue = {
    dialogContainer: dialogContainerRef,
    ...value
  };

  return (
    <CustomContext.Provider value={contextValue}>
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
          {/* Dialog container for managing dialogs */}
          <DialogContainer ref={dialogContainerRef} />
        </Portal>
      </IconProvider>
    </CustomContext.Provider>
  );
}
