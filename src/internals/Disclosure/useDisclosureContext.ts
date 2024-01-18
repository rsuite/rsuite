import { useContext } from 'react';
import DisclosureContext, { DisclosureContextProps } from './DisclosureContext';

export default function useDisclosureContext(component: string): DisclosureContextProps {
  const context = useContext(DisclosureContext);

  if (!context) {
    throw new Error(`<${component}> component must be rendered within a <Disclosure>`);
  }

  return context;
}
