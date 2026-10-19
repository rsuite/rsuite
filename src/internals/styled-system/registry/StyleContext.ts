import { createContext } from 'react';
import type { RegistryScope } from './RegistryScope';

export const StyleContext = createContext<RegistryScope | null>(null);
