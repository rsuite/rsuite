import { createComponent, ComponentProps } from '@/internals/utils';

export type ModalFooterProps = ComponentProps;

const ModalFooter = createComponent<'div', ModalFooterProps>({ name: 'ModalFooter' });

export default ModalFooter;
