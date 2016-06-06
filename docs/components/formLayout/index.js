import React from 'react';
import { Text, Col } from '../../../src';
import Example from '../../fixtures/Example';
import { Markdown } from '../../fixtures/Markdown';


const examples = {
    basic: require('fs').readFileSync(__dirname + '/basic.js', 'utf8'),
    inline: require('fs').readFileSync(__dirname + '/inline.js', 'utf8'),
    horizontal: require('fs').readFileSync(__dirname + '/horizontal.js', 'utf8')
};

export default React.createClass({
    render() {
        return (
            <Col md={9} sm={12}>
                 <h1 className="page-header">
                    表单布局
                </h1>

                <h3>默认布局</h3>
                <Example code={examples.basic} />

                <h3>单行布局</h3>
                <Example code={examples.inline} />

                <h3>左右横向布局</h3>
                <Example code={examples.horizontal} />


                <h3>组件属性</h3>
                <Markdown>
                    {require('./props.md') }
                </Markdown>

            </Col>
        );
    }
});
