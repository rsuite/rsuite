import React from 'react';
import {findDOMNode} from 'react-dom';
import classNames from 'classnames';
import ClassNameMixin from './mixins/ClassNameMixin';
import createChainedFunction from './utils/createChainedFunction';

const ButtonGroup = React.createClass({
    mixins: [ClassNameMixin],
    propTypes: {
        type: React.PropTypes.oneOf(['radio', 'checkbox']),
        classPrefix: React.PropTypes.string,
        vertical: React.PropTypes.bool,
        justified: React.PropTypes.bool,
        block: React.PropTypes.bool,
        onClick: React.PropTypes.func
    },
    getDefaultProps() {
        return {
            block: false,
            justified: false,
            vertical: false,
            classPrefix:'btn-group'
        };
    },
    handleClick(event) {
        let target = event.target;
        let type = this.props.type;
        let refs = this.refs;
        if (type === 'checkbox') {
            this.toggleClass('active', target);
        } else if (type === 'radio') {
            for (let key in refs) {
                let ref = findDOMNode(refs[key]);
                let toggle = target === ref ? 'addClass' : 'removeClass';

                refs[key][toggle]('active');
            }
        }
    },
    render() {

        const {children, className, vertical, block, justified } = this.props;
        const classes = classNames({
            'btn-group': true,
            'btn-block': block,
            [this.prefix('vertical')]: vertical,
            [this.prefix('justified')]: justified
        }, ...this.getClassNames(), className);


        const items = React.Children.map(children, (item, index) => {
            return React.cloneElement(item, {
                key: index,
                ref: 'btn_' + index
            }, item.props.children);
        });

        return (
            <div
                {...this.props}
                className={classes}
                onClick={createChainedFunction(this.handleClick, this.props.onClick) }
                >
                {items}
            </div>
        );
    }
});

export default ButtonGroup;
