import React from 'react';
import ToastContainer, {
  ToastContainerProps,
  ToastContainerInstance,
  PlacementType,
  defaultToasterContainer,
  type GetInstancePropsType
} from './ToastContainer';
import { RSUITE_TOASTER_ID } from '@/internals/symbols';

export interface Toaster {
  /**
   * Push a toast message.
   * @param message The message to be displayed.
   *                eg: `<Message type="success" description="Success" />` or `<Notification type="success" closable>Success</Notification>`
   * @param options The options of the toast message. (optional)
   *                eg: `{ placement: 'topCenter', duration: 5000 }`
   * @returns The key of the toast message.
   */
  push(
    message: React.ReactNode,
    options?: ToastContainerProps
  ): string | undefined | Promise<string | undefined>;

  /**
   * Remove a toast message.
   * @param key  The key of the toast message.
   */
  remove(key: string): void;

  /**
   * Clear all toast messages.
   */
  clear(): void;
}

const containers = new Map<string, React.RefObject<ToastContainerInstance>>();

/**
 * Create a container instance.
 * @param placement
 * @param props
 */
async function createContainer(placement: PlacementType, props: GetInstancePropsType) {
  const [container, containerId] = await ToastContainer.getInstance(props);
  containers.set(`${containerId}_${placement}`, container);

  return container;
}

/**
 * Get the container by ID. Use default ID when ID is not available.
 * @param containerId
 * @param placement
 */
function getContainer(containerId: string, placement: PlacementType) {
  return containers.get(`${containerId}_${placement}`);
}

const toaster: Toaster = (message: React.ReactNode) => toaster.push(message);

toaster.push = (message: React.ReactNode, options: ToastContainerProps = {}) => {
  const { placement = 'topCenter', container = defaultToasterContainer, ...restOptions } = options;

  const containerElement = typeof container === 'function' ? container() : container;

  const containerElementId = containerElement ? containerElement[RSUITE_TOASTER_ID] : null;

  if (containerElementId) {
    const existedContainer = getContainer(containerElementId, placement);
    if (existedContainer) {
      return existedContainer.current?.push(message, restOptions);
    }
  }

  const newOptions = { ...options, container: containerElement, placement };

  return createContainer(placement, newOptions).then(ref => {
    return ref.current?.push(message, restOptions);
  });
};

toaster.remove = (key: string) => {
  containers.forEach(c => c.current?.remove(key));
};

toaster.clear = () => {
  containers.forEach(c => c.current?.clear());
};

export default toaster;
