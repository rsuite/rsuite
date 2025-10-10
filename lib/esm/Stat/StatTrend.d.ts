import { WithAsProps, RsRefForwardingComponent } from '../internals/types';
interface StatTrendProps extends WithAsProps {
    indicator?: 'up' | 'down' | 'equal';
    appearance?: 'default' | 'subtle';
}
declare const StatTrend: RsRefForwardingComponent<'dd', StatTrendProps>;
export default StatTrend;
