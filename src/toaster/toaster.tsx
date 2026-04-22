import React from 'react';
import ToastContainer, {
  ToastContainerProps,
  ToastContainerInstance,
  PlacementType,
  defaultToasterContainer,
  type GetInstancePropsType
} from './ToastContainer';
import { RSUITE_TOASTER_ID } from '@/internals/symbols';
import { guid } from '@/internals/utils';

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

const containers = new Map<string, React.RefObject<ToastContainerInstance | null>>();

/**
 * Track in-progress container creation promises keyed by `${containerId}_${placement}`.
 * This prevents duplicate containers from being created when `push` is called multiple
 * times synchronously (e.g. inside a loop) before the first container has mounted.
 */
const pendingContainerPromises = new Map<
  string,
  Promise<React.RefObject<ToastContainerInstance | null>>
>();

/**
 * Create a container instance.
 * @param placement
 * @param props
 */
async function createContainer(placement: PlacementType, props: GetInstancePropsType) {
  const [container, containerId] = await ToastContainer.getInstance(props);

  const key = `${containerId}_${placement}`;
  containers.set(key, container);
  pendingContainerPromises.delete(key);

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

  if (containerElement) {
    // Pre-assign the container ID so subsequent synchronous calls can find it
    // before the async container creation has completed.
    if (!containerElement[RSUITE_TOASTER_ID]) {
      (containerElement as any)[RSUITE_TOASTER_ID] = guid();
    }

    const containerElementId = containerElement[RSUITE_TOASTER_ID];
    const key = `${containerElementId}_${placement}`;

    const existedContainer = getContainer(containerElementId, placement);
    if (existedContainer) {
      return existedContainer.current?.push(message, restOptions);
    }

    // A container creation for this placement may already be in progress (e.g. when `push`
    // is called multiple times synchronously in a loop). Reuse that promise instead of
    // creating a second container.
    const pendingPromise = pendingContainerPromises.get(key);
    if (pendingPromise) {
      return pendingPromise.then(ref => ref.current?.push(message, restOptions));
    }

    const newOptions = { ...options, container: containerElement, placement };
    const containerPromise = createContainer(placement, newOptions);

    // Register the pending promise before any async work begins so that subsequent
    // synchronous `push` calls for the same placement chain onto it.
    pendingContainerPromises.set(key, containerPromise);

    return containerPromise.then(ref => ref.current?.push(message, restOptions));
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
