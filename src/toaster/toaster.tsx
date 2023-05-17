import React from 'react';
import ToastContainer, { ToastContainerProps, ToastContainerInstance } from './ToastContainer';

export interface Toaster {
  /**
   * Add a message to the container.
   * When the container does not exist, create a new container. Use `placement` as the ID of the container
   * @param message
   * @param options
   */
  push(
    message: React.ReactNode,
    options?: ToastContainerProps
  ): string | undefined | Promise<string | undefined>;

  /**
   * Remove a message by key
   * @param key
   */
  remove(key: string): void;

  /**
   * Clear all messages
   */
  clear(): void;
}

const defaultContainerId = 'default';
const containers = new Map<string, React.RefObject<ToastContainerInstance>>();

/**
 * Create a container by Id.
 * @param containerId
 * @param options
 */
async function createContainer(containerId: string, props: ToastContainerProps) {
  const [container] = await ToastContainer.getInstance(props);
  containers.set(containerId || defaultContainerId, container);

  return container;
}

/**
 * Get the container by ID. Use default ID when ID is not available.
 * @param containerId
 */
function getContainer(containerId?: string) {
  if (containers.size == 0) {
    return null;
  }
  return containers.get(containerId || defaultContainerId);
}

const toaster: Toaster = (message: React.ReactNode) => toaster.push(message);

toaster.push = (message: React.ReactNode, options: ToastContainerProps = {}) => {
  const { placement: containerId, ...restOptions } = options;
  const container = getContainer(containerId);

  if (container?.current) {
    return container.current.push(message, restOptions);
  }

  return createContainer(containerId ?? '', options).then(ref => {
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
