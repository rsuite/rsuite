import React from 'react';
import toaster from './toaster';
import { ToastContainerProps } from './ToastContainer';
import { useCustom } from '../utils';

/**
 * Hook to use the toaster
 * @returns toaster { push, remove, clear }
 */
const useToaster = () => {
  const { toasters } = useCustom();

  return {
    push: (message: React.ReactNode, options?: ToastContainerProps) => {
      const customToaster = toasters?.current?.get(options?.placement || 'topCenter');

      return customToaster ? customToaster.push(message) : toaster.push(message, options);
    },
    remove: (key: string) => {
      toasters
        ? Array.from(toasters.current).forEach(([, c]) => c?.remove(key))
        : toaster.remove(key);
    },
    clear: () => {
      toasters ? Array.from(toasters.current).forEach(([, c]) => c?.clear()) : toaster.clear();
    }
  };
};

export default useToaster;
