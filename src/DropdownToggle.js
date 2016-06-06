import React from 'react';
import classNames from 'classnames';
import Button from './Button';
import elementType from './prop-types/elementType';


const CARET = <span> <span className="caret" /></span>;

let DorpdownToggle = React.createClass({
    propTypes: {
        noCaret: React.PropTypes.bool,
        open: React.PropTypes.bool,
        title: React.PropTypes.string,
        useAnchor: React.PropTypes.bool
    },
    getDefaultProps() {
        return {
            open: false,
            noCaret: false,
            useAnchor: false
        };
    },
    render() {

        let caret = this.props.noCaret ? null : CARET ;
        let Component =  this.props.useAnchor ? 'a' : Button;;

        let classes = {
            ['dropdown-toggle'] : true
        };

        return (
            <Component
                {...this.props}
                className = {classNames(classes, this.props.className)}
                type = "button"
                role = "toggle"
            >
                {this.props.title || this.props.children  }{caret}
            </Component>
        );
    }

});

export default DorpdownToggle;
