import React, { useMemo } from 'react';
import toaster from '../toaster';
import { ToastContainerProps } from '../toaster/ToastContainer';
import { useCustom } from '../utils';

/**
 * Toaster display brief, temporary notifications of actions, errors, or other events in an application.
 * It is often used with the Message and Notification components.
 * @returns toaster { push, remove, clear }
 *
 * @see https://rsuitejs.com/components/use-toaster/
 */
const useToaster = () => {
  const { toasters } = useCustom();

  return useMemo(
    () => ({
      /**
       * Push a toast message.
       * @param message The message to be displayed.
       *                eg: `<Message type="success" description="Success" />` or `<Notification type="success" closable>Success</Notification>`
       * @param options The options of the toast message. (optional)
       *                eg: `{ placement: 'topCenter', duration: 5000 }`
       * @returns The key of the toast message.
       */
      push: (message: React.ReactNode, options?: ToastContainerProps) => {
        const customToaster = toasters?.current?.get(options?.placement || 'topCenter');

        return customToaster
          ? customToaster.push(message, options)
          : toaster.push(message, options);
      },
      /**
       * Remove a toast message.
       * @param key  The key of the toast message.
       */
      remove: (key: string) => {
        toasters
          ? Array.from(toasters.current).forEach(([, c]) => c?.remove(key))
          : toaster.remove(key);
      },
      /**
       * Clear all toast messages.
       */
      clear: () => {
        toasters ? Array.from(toasters.current).forEach(([, c]) => c?.clear()) : toaster.clear();
      }
    }),
    [toasters]
  );
};

export default useToaster;
