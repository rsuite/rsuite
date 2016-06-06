import React, { cloneElement } from 'react';
import classNames from 'classnames';
import elementType from '../prop-types/elementType';

import BaseOverlay from './BaseOverlay';
import Fade from './Fade';

class Overlay extends React.Component {

    render() {
        let {
            children: child,
            animation: transition,
            ...props
        } = this.props;

        if (transition === true) {
            transition = Fade;
        }

        if (transition === false) {
            transition = null;
        }

        if (!transition) {
            child = cloneElement(child, {
                className: classNames('in', child.props.className)
            });
        }

        return (
            <BaseOverlay {...props} transition={transition}>
                {child}
            </BaseOverlay>
        );
    }
}

Overlay.propTypes = {
    ...BaseOverlay.propTypes,

    /**
     * Set the visibility of the Overlay
     */
    show: React.PropTypes.bool,
    /**
     * Specify whether the overlay should trigger onHide when the user clicks outside the overlay
     */
    rootClose: React.PropTypes.bool,
    /**
     * A callback invoked by the overlay when it wishes to be hidden. Required if
     * `rootClose` is specified.
     */
    onHide: React.PropTypes.func,

    /**
    * Use animation
    */
    animation: React.PropTypes.oneOfType([React.PropTypes.bool, elementType])
};

Overlay.defaultProps = {
    animation: Fade,
    rootClose: false,
    show: false
};

export default Overlay;
