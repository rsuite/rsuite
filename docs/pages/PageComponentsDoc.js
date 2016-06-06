import React from 'react';
import * as components from '../components';

var EmptyComponent = React.createClass({
    render: function () {
        return false;
    }
});

var PageComponentsDoc = React.createClass({
    render: function () {
        var component = this.props.params.name;
        var Doc = components[component] || EmptyComponent;
        return <Doc/>;
    }
});

module.exports = PageComponentsDoc;
