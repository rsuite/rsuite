import classNames from 'classnames';
import React from 'react';
import createChainedFunction from './utils/createChainedFunction';
import ClassNameMixin from './mixins/ClassNameMixin';

const ModalHeader = React.createClass({
    mixins: [ClassNameMixin],
    contextTypes: {
        onModalHide: React.PropTypes.func
    },
    propTypes: {
        closeButton: React.PropTypes.bool,
        onHide: React.PropTypes.func
    },
    getDefaultProps() {
        return {
            classPrefix: 'modal',
            closeButton: true
        };
    },
    render() {

        let handleHide = createChainedFunction(this.context.onModalHide, this.props.onHide);
        let classes = classNames(this.prefix('header'), this.props.className);

        let closeButton = (
            <button type="button" className="close" aria-label='Close' onClick={handleHide}>
                <span aria-hidden="true">
                    &times;
                </span>
            </button>
        );

        return (
            <div {...this.props } className={classes}>
                {this.props.closeButton && closeButton}
                {this.props.children}
            </div>
        );
    }
});

export default ModalHeader;
