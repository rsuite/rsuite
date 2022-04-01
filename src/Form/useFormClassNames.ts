import { useClassNames } from '../utils';
import type { FormProps } from './Form';

/**
 * Take <Form> props and return className for <Form> styles
 */
export function useFormClassNames({
  classPrefix = 'form',
  className,
  fluid,
  layout = 'vertical',
  readOnly,
  plaintext,
  disabled
}: Pick<
  FormProps,
  'classPrefix' | 'className' | 'fluid' | 'layout' | 'readOnly' | 'plaintext' | 'disabled'
>): string {
  const { withClassPrefix, merge } = useClassNames(classPrefix);
  return merge(
    className,
    withClassPrefix(layout, fluid && layout === 'vertical' ? 'fluid' : 'fixed-width', {
      readonly: readOnly,
      disabled,
      plaintext
    })
  );
}
