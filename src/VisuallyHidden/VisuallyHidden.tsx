import { createComponent, ComponentProps } from '@/internals/utils';
export type VisuallyHiddenProps = ComponentProps;

/**
 * VisuallyHidden is a component that visually hides its children while keeping them accessible to screen readers.
 *
 * @version 5.52.0
 * @see https://rsuitejs.com/components/visually-hidden/
 */
const VisuallyHidden = createComponent({ name: 'VisuallyHidden', componentAs: 'span' });

export default VisuallyHidden;
