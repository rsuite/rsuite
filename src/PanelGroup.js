import classNames from 'classnames';
import React, { cloneElement } from 'react';

const PanelGroup = React.createClass({

    propTypes: {
        accordion: React.PropTypes.bool,
        activeKey: React.PropTypes.any,
        className: React.PropTypes.string,
        children: React.PropTypes.node,
        defaultActiveKey: React.PropTypes.any,
        classPrefix: React.PropTypes.string,
        onSelect: React.PropTypes.func
    },
    getDefaultProps() {
        return {
            classPrefix: 'panel-group',
            accordion: false
        };
    },

    getInitialState() {
        return {
            activeKey: this.props.defaultActiveKey
        };
    },

    renderPanel(child, index) {

        if (!React.isValidElement(child)) {
            return child;
        }

        let activeKey = this.props.activeKey ? this.props.activeKey : this.state.activeKey;
        let props = {
            key: child.key ? child.key : index,
            ref: child.ref
        };

        if (this.props.accordion) {
            props.headerRole = 'tab';
            props.panelRole = 'tabpanel';
            props.collapsible = true;
            props.expanded = (child.props.eventKey === activeKey);
            props.onSelect = this.handleSelect;
        }

        return cloneElement(
            child,
            props
        );
    },

    shouldComponentUpdate() {
        // Defer any updates to this component during the `onSelect` handler.
        return !this._isChanging;
    },

    handleSelect(key, e) {
        e.preventDefault();

        if (this.props.onSelect) {
            this._isChanging = true;
            this.props.onSelect(key, e);
            this._isChanging = false;
        }

        if (this.state.activeKey === key) {
            key = null;
        }

        this.setState({
            activeKey: key
        });
    },

    render() {

        let {
            className,
            accordion,
            children,
            ...props
        } = this.props;

        let classes = classNames('panel-group', className);

        if (accordion) {
            props.role = 'tablist';
        }
        return (
            <div {...props} className={classes} onSelect={null}>
                {React.Children.map(children, this.renderPanel) }
            </div>
        );
    }
});

export default PanelGroup;
