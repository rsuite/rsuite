import { createComponent, ComponentProps } from '@/internals/utils';
export type FooterProps = ComponentProps;

/**
 * The `<Footer>` component is used to specify the footer of the page.
 * @see https://rsuitejs.com/components/container/
 */
const Footer = createComponent({ name: 'Footer', componentAs: 'footer' });

export default Footer;
