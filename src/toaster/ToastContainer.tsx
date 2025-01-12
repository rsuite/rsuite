import React, { forwardRef, useState, useImperativeHandle, useCallback } from 'react';
import kebabCase from 'lodash/kebabCase';
import Transition from '../Animation/Transition';
import ToastContext from './ToastContext';
import canUseDOM from 'dom-lib/canUseDOM';
import { useClassNames } from '@/internals/hooks';
import { guid, createChainedFunction } from '@/internals/utils';
import { render } from './render';
import type { WithAsProps, InternalRefForwardingComponent } from '@/internals/types';

export const defaultToasterContainer = () => {
  return canUseDOM ? document.body : null;
};

export type PlacementType =
  | 'topCenter'
  | 'bottomCenter'
  | 'topStart'
  | 'topEnd'
  | 'bottomStart'
  | 'bottomEnd';

export const toastPlacements: PlacementType[] = [
  'topCenter',
  'bottomCenter',
  'topStart',
  'topEnd',
  'bottomStart',
  'bottomEnd'
];

export interface ToastContainerProps extends WithAsProps {
  /**
   * The placement of the message box。
   *
   * @default 'topCenter'
   */
  placement?: PlacementType;

  /**
   * Set the message to appear in the specified container
   */
  container?: HTMLElement | (() => HTMLElement) | null;

  /**
   * The number of milliseconds to wait before automatically closing a message.
   */
  duration?: number;

  /**
   * Reset the hide timer if the mouse moves over the message.
   */
  mouseReset?: boolean;
}

interface PushOptions {
  duration?: number;
  mouseReset?: boolean;
  container?: HTMLElement | (() => HTMLElement) | null;
}

export interface ToastContainerInstance {
  push: (message: React.ReactNode, options?: PushOptions) => string;
  remove: (key: string) => void;
  clear: () => void;
  destroy: () => void;
}

export interface NodeProps extends WithAsProps {
  onClose?: (event?: React.MouseEvent<HTMLDivElement>) => void;
}

interface MessageType extends PushOptions {
  key?: string;
  visible?: boolean;
  node: React.ReactElement<NodeProps>;
}

export type GetInstancePropsType = Omit<ToastContainerProps, 'container' | 'placement'> & {
  container: HTMLElement | null;
  placement: PlacementType;
};

interface ToastContainerComponent
  extends InternalRefForwardingComponent<'div', ToastContainerProps> {
  getInstance: (
    props: GetInstancePropsType
  ) => Promise<[React.RefObject<ToastContainerInstance>, string]>;
}

const useMessages = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  const getKey = useCallback(
    (key?: string) => {
      if (typeof key === 'undefined' && messages.length) {
        return messages[messages.length - 1].key;
      }
      return key;
    },
    [messages]
  );

  const push = useCallback((message, options?: PushOptions) => {
    const { duration, mouseReset = true, container } = options || {};
    const key = guid();

    setMessages(prevMessages => [
      ...prevMessages,
      { key, visible: true, node: message, duration, mouseReset, container }
    ]);

    return key;
  }, []);

  const clear = useCallback(() => {
    // Set all existing messages to be invisible.
    setMessages(messages.map(msg => ({ ...msg, visible: false })));

    // Remove all invisible messages after 400ms.
    // The delay removal here is to preserve the animation.
    setTimeout(() => {
      setMessages([]);
    }, 400);
  }, [messages]);

  const remove = useCallback(
    (key?: string) => {
      // Set the message of the specified key to invisible.
      setMessages(
        messages.map(n => {
          if (n.key === getKey(key)) {
            n.visible = false;
          }
          return n;
        })
      );

      // Remove invisible messages after 400ms.
      setTimeout(() => {
        setMessages(messages.filter(msg => msg.visible));
      }, 400);
    },
    [messages, getKey]
  );

  return { messages, push, clear, remove };
};

const ToastContainer: ToastContainerComponent = forwardRef<
  Partial<ToastContainerInstance>,
  ToastContainerProps
>(function ToastContainer(props, ref) {
  const {
    as: Component = 'div',
    className,
    classPrefix = 'toast-container',
    placement = 'topCenter',
    ...rest
  } = props;

  const { withClassPrefix, merge, rootPrefix } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix(kebabCase(placement)));
  const { push, clear, remove, messages } = useMessages();

  useImperativeHandle(ref, () => ({ push, clear, remove }));

  const elements = messages.map(item => {
    const { mouseReset, duration, node } = item;
    return (
      <ToastContext.Provider value={{ usedToaster: true, mouseReset, duration }} key={item.key}>
        <Transition
          in={item.visible}
          exitedClassName={rootPrefix('toast-fade-exited')}
          exitingClassName={rootPrefix('toast-fade-exiting')}
          enteringClassName={rootPrefix('toast-fade-entering')}
          enteredClassName={rootPrefix('toast-fade-entered')}
          timeout={300}
        >
          {(transitionProps, ref) => {
            const { className: transitionClassName, ...rest } = transitionProps;
            return React.cloneElement(node, {
              ...rest,
              ref,
              duration,
              onClose: createChainedFunction(node.props?.onClose, () => remove(item.key)),
              className: merge(rootPrefix('toast'), node.props?.className, transitionClassName)
            });
          }}
        </Transition>
      </ToastContext.Provider>
    );
  });

  return (
    <Component {...rest} className={classes}>
      {elements}
    </Component>
  );
}) as unknown as ToastContainerComponent;

ToastContainer.getInstance = async (props: GetInstancePropsType) => {
  const { container, ...toastProps } = props;

  // Promise to wait for containerRef to be assigned
  let resolveContainerRef: null | ((value?: unknown) => void) = null;
  const containerRefReady = new Promise(resolve => {
    resolveContainerRef = resolve;
  });

  // Create a React ref for the ToastContainer instance
  const toastContainerRef = React.createRef<ToastContainerInstance>();

  // Render the ToastContainer component into the specified container
  const containerId = render(
    <ToastContainer
      {...toastProps}
      ref={ref => {
        (toastContainerRef.current as any) = ref;
        resolveContainerRef?.();
      }}
    />,
    container
  );

  await containerRefReady;

  return [toastContainerRef, containerId];
};

ToastContainer.displayName = 'ToastContainer';

export default ToastContainer;
