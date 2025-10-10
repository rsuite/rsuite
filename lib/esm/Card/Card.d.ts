import CardHeader from './CardHeader';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import type { WithAsProps, RsRefForwardingComponent } from '../internals/types';
export interface CardProps extends WithAsProps {
    /**
     * Show border
     */
    bordered?: boolean;
    /**
     * Whether there is a shadow
     */
    shaded?: boolean | 'hover';
    /**
     * The width of the card
     */
    width?: number | string;
    /**
     * The direction of the card
     */
    direction?: 'row' | 'column';
    /**
     * Different sizes
     */
    size?: 'lg' | 'md' | 'sm';
}
interface CardComponent extends RsRefForwardingComponent<'div', CardProps> {
    Header: typeof CardHeader;
    Body: typeof CardBody;
    Footer: typeof CardFooter;
}
declare const Card: CardComponent;
export default Card;
