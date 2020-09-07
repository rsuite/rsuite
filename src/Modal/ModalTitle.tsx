import createComponent, { ComponentProps } from '../utils/createComponent';
export type ModalTitleProps = ComponentProps;

const ModalTitle = createComponent({ name: 'ModalTitle', componentAs: 'h4' });

export default ModalTitle;
