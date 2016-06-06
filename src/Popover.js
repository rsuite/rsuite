import React from 'react';
import classNames from 'classnames';
import ClassNameMixin from './mixins/ClassNameMixin';

const Popover = React.createClass({
    mixins: [ClassNameMixin],
    propTypes: {
        placement: React.PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
        classPrefix: React.PropTypes.string,
        title: React.PropTypes.node
    },
    getDefaultProps() {
        return {
            classPrefix: 'popover',
            placement: 'right'
        };
    },

    render() {
        const classes = classNames({
            popover: true,
            [this.props.placement]: true
        }, this.props.className);

        const styles = {
            display:'block',
            ...this.props.style
        };

        return (
            <div role="popover" {...this.props} className={classes} style={styles}>
                <div className="arrow" />
                <h3 className={this.prefix('title')}>
                    {this.props.title}
                </h3>
                <div className={this.prefix('content')}>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

export default Popover;
