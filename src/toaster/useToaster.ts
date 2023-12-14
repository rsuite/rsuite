import React, { useMemo } from 'react';
import toaster from './toaster';
import { ToastContainerProps } from './ToastContainer';
import { useCustom } from '../utils';

/**
 * The 'useToaster' hook is a wrapper for the 'toaster' module.
 * @returns toaster { push, remove, clear }
 *
 * @see https://rsuitejs.com/components/message/
 * @see https://rsuitejs.com/components/notification/
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
