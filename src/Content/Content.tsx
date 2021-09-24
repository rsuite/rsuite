import createComponent, { ComponentProps } from '../utils/createComponent';
export type ContentProps = ComponentProps;

/**
 * For Internet Explorer 11 and lower, it's suggested that an ARIA role of "main"
 * be added to the <main> element to ensure it is accessible
 */
const Content = createComponent({ name: 'Content', componentAs: 'main' });

export default Content;
