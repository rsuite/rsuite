import type { FormProps } from '../Form';
/**
 * Take <Form> props and return className for <Form> styles
 */
export default function useFormClassNames({ classPrefix, className, fluid, layout, readOnly, plaintext, disabled }: Pick<FormProps, 'classPrefix' | 'className' | 'fluid' | 'layout' | 'readOnly' | 'plaintext' | 'disabled'>): string;
