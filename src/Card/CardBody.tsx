import { createComponent, ComponentProps } from '@/internals/utils';

export type CardBodyProps = ComponentProps;

const CardBody = createComponent<'div', CardBodyProps>({ name: 'CardBody', componentAs: 'div' });

export default CardBody;
