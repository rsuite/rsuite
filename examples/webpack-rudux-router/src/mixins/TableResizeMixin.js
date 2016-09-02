
import { on, getHeight } from 'dom-lib';
import debounce from '../utils/debounce';

const TableResizeMixin = {
    getInitialState: function () {
        return {
            tableHeight: this.calculateTableHeight()
        };
    },
    calculateTableHeight() {
        const {tableDefaultHeight, frameHeight} = this.props;
        const height = getHeight(global) - frameHeight;
        return height < tableDefaultHeight ? tableDefaultHeight : height;
    },
    handleWindowResize() {
        this.setState({
            tableHeight: this.calculateTableHeight()
        });
    },
    componentDidMount() {
        this._onWindowResizeListener = on(window, 'resize', debounce(this.handleWindowResize, 50));
    },
    componentWillUnmount() {
        if (this._onWindowResizeListener) {
            this._onWindowResizeListener.off();
        }
    }
};

export default TableResizeMixin;
