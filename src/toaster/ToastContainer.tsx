import React, { useState, useImperativeHandle, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import kebabCase from 'lodash/kebabCase';
import Transition from '../Animation/Transition';
import { useClassNames, guid, createChainedFunction, render } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';
import ToastContext from './ToastContext';

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
   *
   */
  container?: HTMLElement | (() => HTMLElement);

  /** The number of milliseconds to wait before automatically closing a message. */
  duration?: number;

  callback?: (ref: React.RefObject<ToastContainerInstance>) => void;
}

interface PushOptions {
  duration?: number;
}

export interface ToastContainerInstance {
  root: HTMLElement;
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

interface ToastContainerComponent extends RsRefForwardingComponent<'div', ToastContainerProps> {
  getInstance: (
    props: ToastContainerProps
  ) => Promise<[React.RefObject<ToastContainerInstance>, () => void]>;
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

  const push = useCallback((message, options) => {
    const key = guid();

    setMessages(prevMessages => [
      ...prevMessages,
      { key, visible: true, node: message, ...options }
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

const ToastContainer: ToastContainerComponent = React.forwardRef(
  (props: ToastContainerProps, ref: any) => {
    const rootRef = useRef<HTMLDivElement>();

    const {
      as: Component = 'div',
      className,
      classPrefix = 'toast-container',
      placement = 'topCenter',
      callback,
      ...rest
    } = props;

    const { withClassPrefix, merge, rootPrefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix(kebabCase(placement)));
    const { push, clear, remove, messages } = useMessages();

    useImperativeHandle(ref, () => ({ root: rootRef.current, push, clear, remove }));

    const elements = messages.map(item => {
      return (
        <Transition
          key={item.key}
          in={item.visible}
          exitedClassName={rootPrefix('toast-fade-exited')}
          exitingClassName={rootPrefix('toast-fade-exiting')}
          enteringClassName={rootPrefix('toast-fade-entering')}
          enteredClassName={rootPrefix('toast-fade-entered')}
          timeout={300}
        >
          {(transitionProps, ref) => {
            const { className: transitionClassName, ...rest } = transitionProps;
            return React.cloneElement(item.node, {
              ...rest,
              ref,
              duration: item.duration,
              // Remove the message after the specified time.
              onClose: createChainedFunction(item.node?.props?.onClose, () => remove(item.key)),
              className: merge(
                rootPrefix('toast'),
                item.node?.props?.className,
                transitionClassName
              )
            });
          }}
        </Transition>
      );
    });

    return (
      <ToastContext.Provider value={{ usedToaster: true }}>
        <Component
          {...rest}
          ref={selfRef => {
            rootRef.current = selfRef;
            callback?.(selfRef);
          }}
          className={classes}
        >
          {elements}
        </Component>
      </ToastContext.Provider>
    );
  }
) as any;

ToastContainer.getInstance = (props: ToastContainerProps) => {
  const { container, ...rest } = props;

  const containerRef = React.createRef<ToastContainerInstance>();
  const containerElement =
    (typeof container === 'function' ? container() : container) || document.body;

  return new Promise(resolve => {
    const renderCallback = () => {
      resolve([containerRef, unmount]);
    };

    const { unmount } = render(
      <ToastContainer {...rest} ref={containerRef} callback={renderCallback} />,
      containerElement
    );
  });
};

ToastContainer.displayName = 'ToastContainer';
ToastContainer.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  placement: PropTypes.elementType,
  container: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  callback: PropTypes.func
};

export default ToastContainer;
