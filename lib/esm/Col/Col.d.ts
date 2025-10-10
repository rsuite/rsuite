import { WithAsProps, RsRefForwardingComponent } from '../internals/types';
export interface ColProps extends WithAsProps {
    /** The number of columns you wish to span for Extra small devices Phones (< 576px) */
    xs?: number;
    /** The number of columns you wish to span for Small devices Tablets (≥ 576px) */
    sm?: number;
    /** The number of columns you wish to span for Medium devices Desktops (≥ 768px) */
    md?: number;
    /** The number of columns you wish to span for Large devices Desktops (≥ 992px) */
    lg?: number;
    /** The number of columns you wish to span for Extra Large devices Desktops (≥ 1200px) */
    xl?: number;
    /** The number of columns you wish to span for Ultra Large devices Desktops (≥ 1400px) */
    xxl?: number;
    /** Move columns to the right for Extra small devices Phones */
    xsOffset?: number;
    /** Move columns to the right for Small devices Tablets */
    smOffset?: number;
    /** Move columns to the right for Medium devices Desktops */
    mdOffset?: number;
    /** Move columns to the right for Large devices Desktops */
    lgOffset?: number;
    /** Move columns to the right for Extra large devices Desktops */
    xlOffset?: number;
    /** Move columns to the right for Ultra large devices Desktops */
    xxlOffset?: number;
    /** Change the order of grid columns to the right for Extra small devices Phones */
    xsPush?: number;
    /** Change the order of grid columns to the right for Small devices Tablets */
    smPush?: number;
    /** Change the order of grid columns to the right for Medium devices Desktops */
    mdPush?: number;
    /** Change the order of grid columns to the right for Large devices Desktops */
    lgPush?: number;
    /** Change the order of grid columns to the right for Extra large devices Desktops */
    xlPush?: number;
    /** Change the order of grid columns to the right for Ultra large devices Desktops */
    xxlPush?: number;
    /** Change the order of grid columns to the left for Extra small devices Phones */
    xsPull?: number;
    /** Change the order of grid columns to the left for Small devices Tablets */
    smPull?: number;
    /** Change the order of grid columns to the left for Medium devices Desktops */
    mdPull?: number;
    /** Change the order of grid columns to the left for Large devices Desktops */
    lgPull?: number;
    /** Change the order of grid columns to the left for Extra large devices Desktops */
    xlPull?: number;
    /** Change the order of grid columns to the left for Ultra large devices Desktops */
    xxlPull?: number;
    /** Hide column on Extra small devices Phones */
    xsHidden?: boolean;
    /** Hide column on Small devices Tablets */
    smHidden?: boolean;
    /** Hide column on Medium devices Desktops */
    mdHidden?: boolean;
    /** Hide column on Large devices Desktops */
    lgHidden?: boolean;
    /** Hide column on Extra large devices Desktops */
    xlHidden?: boolean;
    /** Hide column on Ultra large devices Desktops */
    xxlHidden?: boolean;
}
/**
 * The `Col` component is used for layout and grids.
 * @see https://rsuitejs.com/en/components/grid
 */
declare const Col: RsRefForwardingComponent<'div', ColProps>;
export default Col;
