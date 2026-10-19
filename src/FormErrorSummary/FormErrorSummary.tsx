import React from 'react';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef } from '@/internals/utils';
import { useStyles, useUniqueId } from '@/internals/hooks';
import useCustomConfig from '@/internals/hooks/useCustomConfig';

export interface FormErrorSummaryItem {
  /** A unique, stable field identity. Treated as an opaque string. */
  name: string;
  /** The label of the field with an error. */
  label: React.ReactNode;
  /** A description of the error and how to correct it. */
  message: React.ReactNode;
  /** The unique DOM ID of the actual focusable control. */
  controlId?: string;
}

export interface FormErrorSummaryProps extends Omit<BoxProps, 'children' | 'onSelect'> {
  /** An application-localized heading for the error summary. */
  header: React.ReactNode;
  /** Fields with errors, in the order they should be presented. */
  items: readonly FormErrorSummaryItem[];
  /** Tab order of the summary root. Defaults to -1 for application-controlled focus. */
  tabIndex?: number;
  /** Called before navigation. Prevent the default action to reveal or focus a custom field. */
  onSelect?: (item: FormErrorSummaryItem, event: React.MouseEvent<HTMLAnchorElement>) => void;
}

function canFocusControl(control: HTMLElement, link: HTMLAnchorElement) {
  if (
    !control.isConnected ||
    control.closest('[hidden], [inert], [aria-hidden="true"], [aria-disabled="true"]') ||
    control.matches(':disabled') ||
    !control.getClientRects().length
  ) {
    return false;
  }

  const visibility = control.ownerDocument.defaultView?.getComputedStyle(control).visibility;
  if (visibility === 'hidden' || visibility === 'collapse') {
    return false;
  }

  const dialog = link.closest('[role="dialog"], [role="alertdialog"], dialog');
  return !dialog || dialog.contains(control);
}

/**
 * An ordered error overview with links to the corresponding form controls.
 * Validation and submission focus remain controlled by the application.
 * @see https://rsuitejs.com/components/form/
 */
const FormErrorSummary = forwardRef<'div', FormErrorSummaryProps>((props, ref) => {
  const { propsWithDefaults } = useCustomConfig('FormErrorSummary', props);
  const {
    classPrefix = 'form-error-summary',
    className,
    header,
    items,
    tabIndex = -1,
    onSelect,
    ...rest
  } = propsWithDefaults;
  const headerId = useUniqueId('rs-form-error-summary-');
  const { withPrefix, prefix, merge } = useStyles(classPrefix);

  const handleSelect = (item: FormErrorSummaryItem, event: React.MouseEvent<HTMLAnchorElement>) => {
    const link = event.currentTarget;
    const ownerDocument = link.ownerDocument;
    const previousFocus = ownerDocument.activeElement;

    onSelect?.(item, event);
    if (event.defaultPrevented) {
      return;
    }

    // The default link action can scroll a hidden or unrelated field without focusing it.
    event.preventDefault();
    if (
      !link.isConnected ||
      (ownerDocument.activeElement !== previousFocus && ownerDocument.activeElement?.isConnected)
    ) {
      return;
    }

    const control = item.controlId ? ownerDocument.getElementById(item.controlId) : null;
    if (!control || !canFocusControl(control, link)) {
      return;
    }

    control.focus({ preventScroll: true });
    if (ownerDocument.activeElement === control) {
      control.scrollIntoView({ behavior: 'instant', block: 'nearest', inline: 'nearest' });
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <Box
      ref={ref}
      role="region"
      aria-labelledby={rest['aria-label'] ? undefined : headerId}
      {...rest}
      tabIndex={tabIndex}
      className={merge(className, withPrefix())}
    >
      <div id={headerId} className={prefix`header`} role="heading" aria-level={2}>
        {header}
      </div>
      <ul className={prefix`list`}>
        {items.map(item => (
          <li key={item.name} className={prefix`item`}>
            {item.controlId ? (
              <a
                className={prefix`link`}
                href={`#${encodeURIComponent(item.controlId)}`}
                onClick={event => handleSelect(item, event)}
              >
                <span className={prefix`label`}>{item.label}</span> {item.message}
              </a>
            ) : (
              <>
                <span className={prefix`label`}>{item.label}</span> {item.message}
              </>
            )}
          </li>
        ))}
      </ul>
    </Box>
  );
});

FormErrorSummary.displayName = 'FormErrorSummary';

export default FormErrorSummary;
