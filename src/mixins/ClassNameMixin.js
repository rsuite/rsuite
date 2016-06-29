import React from 'react';
import { findDOMNode } from 'react-dom';
import { hasClass, addClass, removeClass } from 'dom-lib';

const SIZES = ['lg', 'md', 'sm', 'xs'];
const SHAPES = ['default', 'primary', 'link', 'inverse', 'success', 'warning', 'danger', 'info'];

const ClassNameMixin = {
    propTypes: {
        size: React.PropTypes.oneOf(SIZES),
        shape: React.PropTypes.oneOf(SHAPES)
    },
    getClassNames() {
        let classes = [];
        let {shape, size} = this.props;

        shape && classes.push(this.prefix(shape));
        size && classes.push(this.prefix(size));

        return classes;
    },
    prefix(className) {
        let {classPrefix } = this.props;
        let prefix = classPrefix ? classPrefix + '-' : '';
        return prefix + className;
    },
    hasClass: function (className, target = findDOMNode(this)) {
        return hasClass(target, className);
    },
    addClass: function (className, target = findDOMNode(this)) {
        return addClass(target,className);
    },
    removeClass: function (className, target = findDOMNode(this)) {
        return removeClass(target, className);
    },
    toggleClass: function (className, target = findDOMNode(this)) {

        let toggle = this.hasClass(className, target) ? 'removeClass' : 'addClass';
        return this[toggle](className, target);
    }
};

export default ClassNameMixin;
