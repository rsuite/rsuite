import React from 'react';
import classNames from 'classnames';
import elementType from './prop-types/elementType';

const SIZES = ['xs', 'sm', 'md', 'lg'];
const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const Col = React.createClass({
    propTypes: {

        //class-prefix `col-xs-` `col-sm-` `col-md-`  `col-lg-`
        xs: React.PropTypes.oneOf(NUMBERS),
        sm: React.PropTypes.oneOf(NUMBERS),
        md: React.PropTypes.oneOf(NUMBERS),
        lg: React.PropTypes.oneOf(NUMBERS),

        //class-prefix `col-xs-offset-` `col-sm-offset-` `col-md-offset-`  `col-lg-offset-`
        xsOffset: React.PropTypes.oneOf(NUMBERS),
        smOffset: React.PropTypes.oneOf(NUMBERS),
        mdOffset: React.PropTypes.oneOf(NUMBERS),
        lgOffset: React.PropTypes.oneOf(NUMBERS),

        //class-prefix `col-xs-push-` `col-sm-push-` `col-md-push-`  `col-lg-push-`
        xsPush: React.PropTypes.oneOf(NUMBERS),
        smPush: React.PropTypes.oneOf(NUMBERS),
        mdPush: React.PropTypes.oneOf(NUMBERS),
        lgPush: React.PropTypes.oneOf(NUMBERS),

        //class-prefix `col-xs-pull-` `col-sm-pull-` `col-md-pull-`  `col-lg-pull-`
        xsPull: React.PropTypes.oneOf(NUMBERS),
        smPull: React.PropTypes.oneOf(NUMBERS),
        mdPull: React.PropTypes.oneOf(NUMBERS),
        lgPull: React.PropTypes.oneOf(NUMBERS),


        //adds class `hidden-xs` `hidden-sm` `hidden-md`  `hidden-lg`
        xsHidden: React.PropTypes.bool,
        smHidden: React.PropTypes.bool,
        mdHidden: React.PropTypes.bool,
        lgHidden: React.PropTypes.bool,

        componentClass: elementType
    },

    getDefaultProps() {
        return {
            componentClass: 'div'
        };
    },

    render() {

        const Component = this.props.componentClass;
        const classes = {};

        SIZES.map((size) => {
            let offset = this.props[size + 'Offset'];
            let push = this.props[size + 'Push'];
            let pull = this.props[size + 'Pull'];

            classes['hidden-' + size] = this.props[size + 'Hidden'];
            classes['col-' + size + '-' + this.props[size]] = (this.props[size] > 0);
            classes['col-' + size + '-offset-' + offset] = (offset >= 0);
            classes['col-' + size + '-push-' + push] = (push >= 0);
            classes['col-' + size + '-pull-' + pull] = (pull >= 0);
        });


        return (
            <Component {...this.props} className={classNames(this.props.className, classes) }>
                {this.props.children}
            </Component>
        );
    }
});

export default Col;
