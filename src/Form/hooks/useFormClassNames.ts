import { useStyles } from '@/internals/hooks';
import type { FormProps } from '../Form';

/**
 * Take <Form> props and return className for <Form> styles
 */
export default function useFormClassNames({
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
  const { withPrefix, merge } = useStyles(classPrefix);
  return merge(
    className,
    withPrefix(layout, fluid && layout === 'vertical' ? 'fluid' : 'fixed-width', {
      readonly: readOnly,
      disabled,
      plaintext
    })
  );
}
