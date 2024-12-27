// Headless Disclosure
// Ref: https://w3c.github.io/aria-practices/#disclosure
import React, { useMemo, useReducer, useRef, useCallback, useContext } from 'react';
import DisclosureContext, {
  DisclosureAction,
  DisclosureActionTypes,
  DisclosureContextProps,
  DisclosureState
} from './DisclosureContext';
import DisclosureButton from './DisclosureButton';
import DisclosureContent from './DisclosureContent';
import useClickOutside from '../hooks/useClickOutside';

export type DisclosureTrigger = 'click' | 'hover';

export interface DisclosureRenderProps
  extends Pick<React.HTMLAttributes<HTMLElement>, 'onMouseEnter' | 'onMouseLeave'> {
  open: boolean;
}

export interface DisclosureProps {
  children: (props: DisclosureRenderProps, ref: React.Ref<HTMLElement>) => React.ReactNode;

  /** Controlled open state */
  open?: boolean;

  /** Whether disclosure is initially expanded */
  defaultOpen?: boolean;
  hideOnClickOutside?: boolean;

  /** Callback when disclosure button is being activated to update the open state */
  onToggle?: (open: boolean, event: React.SyntheticEvent) => void;

  /** What mouse events should disclosure reacts to */
  trigger?: readonly DisclosureTrigger[];
}

const initialDisclosureState: DisclosureState = {
  open: false
};

function disclosureReducer(state: DisclosureState, action: DisclosureAction): DisclosureState {
  switch (action.type) {
    case DisclosureActionTypes.Show:
      return { ...state, open: true };
    case DisclosureActionTypes.Hide:
      return { ...state, open: false };
  }
  return state;
}

export interface DisclosureComponent extends React.FC<DisclosureProps> {
  Button: typeof DisclosureButton;
  Content: typeof DisclosureContent;
}

const Disclosure: DisclosureComponent = React.memo((props: DisclosureProps) => {
  const {
    children,
    open: openProp,
    defaultOpen = false,
    hideOnClickOutside = false,
    onToggle,
    trigger = ['click']
  } = props;

  const parentDisclosure = useContext(DisclosureContext);

  const [{ open: openState }, dispatch] = useReducer(disclosureReducer, {
    ...initialDisclosureState,
    open: defaultOpen
  });

  const containerElementRef = useRef<HTMLElement>(null);

  const open = openProp ?? openState;

  useClickOutside({
    enabled: hideOnClickOutside,
    isOutside: event => !containerElementRef.current?.contains(event.target as HTMLElement),
    handle: () => dispatch({ type: DisclosureActionTypes.Hide })
  });

  const onMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (!open) {
        dispatch({ type: DisclosureActionTypes.Show });
        onToggle?.(true, event);
      }
    },
    [open, dispatch, onToggle]
  );
  const onMouseLeave = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (open) {
        dispatch({ type: DisclosureActionTypes.Hide });
        onToggle?.(false, event);
      }
    },
    [open, dispatch, onToggle]
  );

  const contextValue = useMemo<DisclosureContextProps>(() => {
    const cascadeDispatch = (action: DisclosureAction) => {
      const result = dispatch(action);
      if ('cascade' in action) {
        parentDisclosure?.[1](action);
      }
      return result;
    };

    return [{ open }, cascadeDispatch, { onToggle, trigger }];
  }, [parentDisclosure, open, dispatch, onToggle, trigger]);

  const renderProps = useMemo(() => {
    const renderProps: DisclosureRenderProps = { open };

    if (trigger.includes('hover')) {
      renderProps.onMouseEnter = onMouseEnter;
      renderProps.onMouseLeave = onMouseLeave;
    }

    return renderProps;
  }, [open, trigger, onMouseEnter, onMouseLeave]);

  return (
    <DisclosureContext.Provider value={contextValue}>
      {children(renderProps, containerElementRef)}
    </DisclosureContext.Provider>
  );
}) as any;

Disclosure.displayName = 'Disclosure';
Disclosure.Button = DisclosureButton;
Disclosure.Content = DisclosureContent;

export default Disclosure;
