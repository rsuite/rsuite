import React from 'react';
import classNames from 'classnames';
import ClassNameMixin from './mixins/ClassNameMixin';


const ModalTitle = React.createClass({
    mixins: [ClassNameMixin],
    render() {
        let classes = classNames(this.prefix('title'), this.props.className);
        return (
            <h4 {...this.props} className={classes}>
                {this.props.children}
            </h4>
        );
    }
});

export default ModalTitle;
