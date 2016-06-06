import React from 'react';
import classNames from 'classnames';
import ClassNameMixin from './mixins/ClassNameMixin';


const Tooltip = React.createClass({
    mixins: [ClassNameMixin],
    propTypes: {
        placement: React.PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
        positionLeft: React.PropTypes.number,
        positionTop: React.PropTypes.number,
        classPrefix: React.PropTypes.string,
        arrowOffsetLeft: React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string
        ]),
        arrowOffsetTop: React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string
        ]),
        title: React.PropTypes.node
    },
    getDefaultProps() {
        return {
            placement: 'right',
            classPrefix: 'tooltip'
        };
    },
    render() {
        let { placement, className, positionLeft, positionTop, children} = this.props;
        const classes = classNames({
            'tooltip': true,
            [placement]: true
        }, className);

        const style = {
            left: positionLeft,
            top: positionTop
        };

        const arrowStyle = {
            left: this.props.arrowOffsetLeft,
            top: this.props.arrowOffsetTop
        };
        return (
            <div
                role="tooltip"
                {...this.props}
                className={classes}
                style={style}
                >
                <div className={this.prefix('arrow') } style={arrowStyle} />
                <div className={this.prefix('inner') }>
                    {children}
                </div>
            </div>
        );
    }
});

export default Tooltip;
