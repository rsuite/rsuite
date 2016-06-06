import classNames from 'classnames';
import React from 'react';
import ClassNameMixin from './mixins/ClassNameMixin';

const ModalDialog = React.createClass({
    mixins: [ClassNameMixin],
    propTypes: {
        /**
         * A css class to apply to the Modal dialog DOM node.
         */
        dialogClassName: React.PropTypes.string
    },

    render() {

        let { className, style, ...props} = this.props;
        let modalStyle = {
            display: 'block',
            ...style
        };
        let modalClasses = classNames('modal', className);
        let dialogClasses = classNames(
            this.prefix('dialog'),
            this.props.dialogClassName,
            ...this.getClassNames()
        );

        return (
            <div
                title={null}
                tabIndex="-1"
                role="dialog"
                style={ modalStyle }
                className={modalClasses}
                {...props}
            >
                <div className={dialogClasses}>
                    <div className={this.prefix('content')} role="document">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
});

export default ModalDialog;
