import React from 'react';
import { CustomProviderProps } from './CustomContext';
/**
 * CustomProvider is used to provide global configuration, such as language, theme, etc.
 *
 * @see https://rsuitejs.com/components/custom-provider
 */
export default function CustomProvider(props: Omit<CustomProviderProps, 'toasters'>): React.JSX.Element;
