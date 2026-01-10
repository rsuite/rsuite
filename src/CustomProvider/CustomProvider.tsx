import React, { useRef, useMemo } from 'react';
import IconProvider from '@rsuite/icons/IconProvider';
import { usePortal, useIsomorphicLayoutEffect } from '@/internals/hooks';
import { useSSRStyles } from '@/internals/hooks/useSSRStyles';
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
    components,
    iconClassPrefix = classPrefix,
    theme,
    toastContainer = defaultToasterContainer,
    disableRipple,
    csp,
    disableInlineStyles,
    styleCollector: userStyleCollector,
    forceSSR,
    ...rest
  } = props;
  const toasters = useRef(new Map<string, ToastContainerInstance>());
  // This creates a ref that matches the expected type in CustomContext
  const dialogContainerRef = useRef<DialogContainerInstance>(null);
  const { Portal } = usePortal({ container: toastContainer, waitMount: true });

  // 🔥 Automatic SSR style collection
  const { collector: autoCollector, styleElement } = useSSRStyles({
    collector: userStyleCollector,
    nonce: csp?.nonce,
    forceSSR
  });

  // Use user-provided collector or auto-created one
  const styleCollector = userStyleCollector || autoCollector;

  // Note: We don't use useMemo here because `rest` contains spread props (locale, rtl, formatDate, parseDate)
  // which are new object references on every render, making memoization ineffective.
  const value = {
    classPrefix,
    theme,
    toasters,
    disableRipple,
    components,
    toastContainer,
    csp,
    styleCollector,
    ...rest
  };

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
      {/*
        🔥 SSR styles are rendered AFTER children so all styles are collected first.

        ⚠️ IMPORTANT: In production SSR, DO NOT rely on this auto-rendered styleElement!
        Instead, use the rsuite/ssr API to manually extract styles and inject them into <head>:

        import { renderWithStyles } from 'rsuite/ssr';

        const { html, styles } = renderWithStyles((collector) =>
          renderToString(
            <CustomProvider styleCollector={collector}>
              <App />
            </CustomProvider>
          )
        );

        Then inject `styles` into your HTML <head> tag.
        See: /src/internals/Box/test/ssr-usage-example.md
      */}
      {styleElement}
    </CustomContext.Provider>
  );
}
