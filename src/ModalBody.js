import classNames from 'classnames';
import React from 'react';
import ClassNameMixin from './mixins/ClassNameMixin';

const ModalBody = React.createClass({
    mixins: [ClassNameMixin],
    getDefaultProps() {
        return {
            classPrefix: 'modal'
        };
    },
    render() {
        let classes = classNames(this.prefix('body'), this.props.className);
        return (
            <div {...this.props} className={classes} >
                {this.props.children}
            </div>
        );
    }
});

export default ModalBody;
