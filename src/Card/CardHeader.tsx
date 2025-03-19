import { createComponent, ComponentProps } from '@/internals/utils';

export type CardHeaderProps = ComponentProps;

const CardHeader = createComponent<'div', CardHeaderProps>({
  name: 'CardHeader',
  componentAs: 'div'
});

export default CardHeader;
