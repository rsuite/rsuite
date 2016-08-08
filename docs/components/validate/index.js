import React from 'react';
import { Col } from '../../../src';
import Example from '../../fixtures/Example';
import { Markdown } from '../../fixtures/Markdown';


const examples = {
    basic: require('fs').readFileSync(__dirname + '/basic.js', 'utf8')
};

export default React.createClass({
    render() {
        return (
            <Col md={9} sm={12}>
                 <h1 className="page-header">
                    表单验证
                    <span className="page-header-en">
                        <code>Form</code>、
                        <code>Field</code>
                    </span>
                </h1>

                <Markdown>
                    {require('./overview.md') }
                </Markdown>
                <h3>基础验证</h3>
                <Example code={examples.basic} />

            </Col>
        );
    }
});
