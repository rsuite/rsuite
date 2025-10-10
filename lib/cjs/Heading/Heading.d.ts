import { WithAsProps, RsRefForwardingComponent } from '../internals/types';
export interface HeadingProps extends WithAsProps {
    /**
     * Sets heading level, h1 through h6.
     * @default 3
     */
    level?: 1 | 2 | 3 | 4 | 5 | 6;
}
/**
 *
 * The `Heading` component is used to display a heading.
 *
 * @see https://rsuitejs.com/components/heading
 */
declare const Heading: RsRefForwardingComponent<'h3', HeadingProps>;
export default Heading;
