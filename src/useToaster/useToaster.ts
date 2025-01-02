import React, { useMemo, useContext } from 'react';
import toaster from '../toaster';
// From CustomProvider/CustomProvider.tsx import CustomContext instead of directly from 'CustomProvider/index.ts'
// because babel compiles commonjs, which causes CustomContext to be undefined
import { CustomContext } from '../CustomProvider/CustomProvider';
import { ToastContainerProps } from '../toaster/ToastContainer';

/**
 * Toaster display brief, temporary notifications of actions, errors, or other events in an application.
 * It is often used with the Message and Notification components.
 * @returns toaster { push, remove, clear }
 *
 * @see https://rsuitejs.com/components/use-toaster/
 */
const useToaster = () => {
  const { toasters, toastContainer } = useContext(CustomContext);

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
        const container =
          (typeof options?.container === 'function' ? options?.container() : options?.container) ||
          toastContainer;

        if (container === toastContainer) {
          return toasters?.current?.get(options?.placement || 'topCenter')?.push(message, options);
        } else {
          return toaster.push(message, options);
        }
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
    [toastContainer, toasters]
  );
};

export default useToaster;
