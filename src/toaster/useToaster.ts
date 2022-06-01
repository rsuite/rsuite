import React from 'react';
import toaster from './toaster';
import { ToastContainerProps } from './ToastContainer';
import { useCustom } from '../utils';

const useToaster = () => {
  const { toasters } = useCustom();

  return {
    push: (message: React.ReactNode, options: ToastContainerProps = {}) => {
      if (toasters) {
        return toasters?.current.get(options.placement || 'topCenter')?.push(message);
      }
      return toaster.push(message, options);
    },
    remove: (key: string) => {
      toasters
        ? Array.from(toasters?.current).forEach(([, c]) => c?.remove(key))
        : toaster.remove(key);
    },
    clear: () => {
      toasters ? Array.from(toasters?.current).forEach(([, c]) => c?.clear()) : toaster.clear();
    }
  };
};

export default useToaster;
