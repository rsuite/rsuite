import { createComponent, ComponentProps } from '@/internals/utils';

export type CardFooterProps = ComponentProps;

const CardFooter = createComponent<'div', CardFooterProps>({
  name: 'CardFooter',
  componentAs: 'div'
});

export default CardFooter;
