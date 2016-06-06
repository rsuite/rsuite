import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Radio  from './Radio';

const RadioList = React.createClass({

    propTypes: {
        options: React.PropTypes.array,
        name: React.PropTypes.string,
        inline: React.PropTypes.bool
    },
    handleChange(event) {

        if(event.target.type !== 'radio'){
            return;
        }

        const { children } = this.props;
        const target = event.target;
        const refs = this.refs;

        for (let key in refs) {
            let ref = ReactDOM.findDOMNode(refs[key]);
            if(target !== ref){
                refs[key].setState({
                   checked : false
                });
            }
        }
    },
    render() {

        const {
            className,
            inline,
            name,
            children,
            options
        } = this.props;

        const clesses = classNames({
            'radio-list': true
        }, className);

        const items = React.Children.map(children, (child, index) => {
            return React.cloneElement(child, {
                key: index,
                ref: 'radio_' + index,
                inline: inline,
                name: name
            }, child.props.children);
        });

        return (
            <div
                onClick = {this.handleChange}
                className = {clesses}
                role = "radio-list"
                >
                {items}
            </div>
        );
    }
});

export default RadioList;
