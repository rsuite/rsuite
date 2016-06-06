import React from 'react';
import {Text, Col} from '../../../src';
import Example from '../../fixtures/Example';
import {Markdown} from '../../fixtures/Markdown';

const examples = {
    basic: require('fs').readFileSync(__dirname + '/basic.js', 'utf8'),
    checkbox: require('fs').readFileSync(__dirname + '/checkbox.js', 'utf8'),
    radio: require('fs').readFileSync(__dirname + '/radio.js', 'utf8'),
    toolbar: require('fs').readFileSync(__dirname + '/toolbar.js', 'utf8'),
    vertical: require('fs').readFileSync(__dirname + '/vertical.js', 'utf8'),
    block: require('fs').readFileSync(__dirname + '/block.js', 'utf8'),
    justified: require('fs').readFileSync(__dirname + '/justified.js', 'utf8'),
    sizing: require('fs').readFileSync(__dirname + '/sizing.js', 'utf8')

};
export default React.createClass({
    render() {
        return (
            <Col md={9} sm={12}>
                <h1 className="page-header">
                    Button Groups
                    <span className="page-header-en">
                        <code>ButtonGroup</code>、
                        <code>ButtonToolbar</code>
                    </span>
                </h1>

                <h3>默认样式</h3>
                <Example code={examples.basic} />

                <h3>单选，多选</h3>
                <Text>
                    <code>type</code>属性设置为: <code>radio</code>
                </Text>
                <Example code={examples.radio} />

                <Text>
                    <code>type</code>属性设置为: <code>checkbox</code>
                </Text>
                <Example code={examples.checkbox} />

                <h3>大小</h3>
                <Example code={examples.sizing} />

                <h3>按钮工具栏</h3>
                <Example code={examples.toolbar} />

                <h3>垂直</h3>
                <Text>添加属性 <code>vertical</code></Text>
                <Example code={examples.vertical} />

                <Text>添加属性 <code>block</code>，把按钮组设置为块级元素</Text>
                <Example code={examples.block} />


                <h3>满陈列</h3>
                <Example code={examples.justified} />


                <h3>组件属性</h3>
                <Markdown>
                    {require('./props.md') }
                </Markdown>

            </Col>
        );
    }
});
