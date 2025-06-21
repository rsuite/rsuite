import { createComponent, ComponentProps } from '@/internals/utils';

export type ImageWrapperProps = ComponentProps;

export const ImageWrapper = createComponent<'div', ImageWrapperProps>({
  name: 'ImageWrapper',
  componentAs: 'div'
});
