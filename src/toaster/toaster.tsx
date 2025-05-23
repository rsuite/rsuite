import React from 'react';
import ToastContainer, {
  ToastContainerProps,
  ToastContainerInstance,
  PlacementType,
  defaultToasterContainer,
  type GetInstancePropsType
} from './ToastContainer';
import { toasterKeyOfContainerElement } from './render';

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
const pendingContainers = new Map<string, Promise<React.RefObject<ToastContainerInstance>>>();

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

toaster.push = async (message: React.ReactNode, options: ToastContainerProps = {}) => {
  const { placement = 'topCenter', container = defaultToasterContainer, ...restOptions } = options;

  const containerElement = typeof container === 'function' ? container() : container;

  const containerElementId = containerElement
    ? containerElement[toasterKeyOfContainerElement]
    : null;

  const containerKey = `${containerElementId || 'default'}_${placement}`;

  const existingContainerRef = containers.get(containerKey);
  if (existingContainerRef && existingContainerRef.current) {
    return existingContainerRef.current.push(message, restOptions);
  }

  if (pendingContainers.has(containerKey)) {
    // Important: await the promise from pendingContainers
    const pendingRef = await pendingContainers.get(containerKey);
    return pendingRef?.current?.push(message, restOptions);
  }

  const creationPromise = (async () => {
    const getInstanceProps: GetInstancePropsType = {
      container: containerElement,
      placement,
      ...restOptions
    };

    const [newContainerRef, _resolvedContainerId] = await ToastContainer.getInstance(getInstanceProps);
    
    containers.set(containerKey, newContainerRef); // Store the resolved ref in the main containers map
    return newContainerRef; // The promise resolves to the new container's ref
  })();

  pendingContainers.set(containerKey, creationPromise);

  try {
    const newResolvedRef = await creationPromise;
    return newResolvedRef.current?.push(message, restOptions);
  } finally {
    pendingContainers.delete(containerKey); // Clean up after creation is done (success or fail)
  }
};

toaster.remove = (key: string) => {
  containers.forEach(c => c.current?.remove(key));
};

toaster.clear = () => {
  containers.forEach(c => c.current?.clear());
};

export default toaster;
