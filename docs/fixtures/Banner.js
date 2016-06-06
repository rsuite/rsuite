import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Example from './Example';

const indexExample = require('fs').readFileSync(__dirname + '/indexExample.js', 'utf8');

const Banner = React.createClass({

    render: function () {

        return (
            <Example isBanner id="banner" code={indexExample} >
                {this.props.children}
            </Example>
        );
    }
});

export default Banner;
