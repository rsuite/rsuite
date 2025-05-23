import React, { useState, useImperativeHandle, useCallback } from 'react';
import PropTypes from 'prop-types';
import kebabCase from 'lodash/kebabCase';
import Transition from '../Animation/Transition';
import ToastContext from './ToastContext';
import canUseDOM from 'dom-lib/canUseDOM';
import { useClassNames } from '@/internals/hooks';
import { guid, createChainedFunction } from '@/internals/utils';
import { WithAsProps, RsRefForwardingComponent } from '@/internals/types';
import { render } from './render';

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
  container?: HTMLElement | (() => HTMLElement);

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
  container?: HTMLElement | (() => HTMLElement);
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

interface ToastContainerComponent extends RsRefForwardingComponent<'div', ToastContainerProps> {
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
      setMessages(prevMessages => []);
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
        setMessages(prevMessages => prevMessages.filter(msg => msg.visible));
      }, 400);
    },
    [messages, getKey]
  );

  return { messages, push, clear, remove };
};

const ToastContainer: ToastContainerComponent = React.forwardRef(
  (props: ToastContainerProps, ref: any) => {
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
  }
) as any;

ToastContainer.getInstance = async (props: GetInstancePropsType) => {
  const { container, ...rest } = props;
  let getRefResolve: null | ((value?: unknown) => void) = null;
  const getRefPromise = new Promise(res => {
    getRefResolve = res;
  });

  const containerRef = React.createRef<ToastContainerInstance>();

  // promise containerId & containerRef all have value
  const containerId = render(
    <ToastContainer
      {...rest}
      ref={ref => {
        (containerRef as any).current = ref;
        getRefResolve && getRefResolve();
      }}
    />,
    container
  );
  await getRefPromise;
  return [containerRef, containerId];
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
