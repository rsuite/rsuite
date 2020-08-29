import createComponent, { ComponentProps } from '../utils/createComponent';
export type HeaderProps = ComponentProps;

const ModalTitle = createComponent({ name: 'ModalTitle', componentAs: 'h4' });

export default ModalTitle;
