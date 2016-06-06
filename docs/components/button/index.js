import React from 'react';
import {Text, Col} from '../../../src';
import Example from '../../fixtures/Example';
import {Markdown} from '../../fixtures/Markdown';


const examples = {
    basic: require('fs').readFileSync(__dirname + '/basic.js', 'utf8'),
    size: require('fs').readFileSync(__dirname + '/size.js', 'utf8'),
    block: require('fs').readFileSync(__dirname + '/block.js', 'utf8')
};

export default React.createClass({
    render() {
        return (
            <Col md={9} sm={12}>
                <h1 className="page-header">
                    Buttons
                    <span className="page-header-en">
                        <code>Button</code>
                    </span>
                </h1>


                <h3>默认样式</h3>

                <Example code={examples.basic} />

                <h3>按钮大小</h3>
                <Text>
                    <code>size</code>属性设置按钮大小, 值包括:
                    <code>lg</code> <code>md</code> <code>sm</code> <code>xs</code>
                </Text>
                <Example code={examples.size} />

                <Text>创建块级的按钮，给组件设置一个 <code>block</code> 属性</Text>
                <Example code={examples.block} />

                <h3>组件属性</h3>
                <Markdown>
                    {require('./props.md') }
                </Markdown>

            </Col>
        );
    }
});
