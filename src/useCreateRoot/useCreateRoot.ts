import { createContext, ReactNode, useContext } from 'react';
import { Container } from 'react-dom';

export interface ReactRoot {
  render(children: ReactNode): void;
  unmount(): void;
}

export type CreateRootFn = (container: Container, options?: any) => ReactRoot;

const CreateRootContext = createContext<CreateRootFn | null>(null);

export function useCreateRoot() {
  return useContext(CreateRootContext) || undefined;
}

export const CreateRootContextProvider = CreateRootContext.Provider;

export default CreateRootContextProvider;
