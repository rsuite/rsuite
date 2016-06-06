import React from 'react';
import { Text, Col } from '../../../src';
import Example from '../../fixtures/Example';
import { Markdown } from '../../fixtures/Markdown';


const examples = {
    basic: require('fs').readFileSync(__dirname + '/basic.js', 'utf8'),
    props: require('fs').readFileSync(__dirname + '/props.js', 'utf8')
};

export default React.createClass({
    render() {
        return (
            <Col md={9} sm={12}>
                <h1 className="page-header">
                    Tables
                    <span className="page-header-en">
                        <code>Table</code>
                    </span>
                </h1>

                <h3>默认样式</h3>
                <Example code={examples.basic} />

                <h3>属性叠加</h3>
                <Example code={examples.props} />

                <h3>组件属性</h3>
                <Markdown>
                    {require('./props.md') }
                </Markdown>

            </Col>
        );
    }
});
