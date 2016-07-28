import React from 'react';
import {Text, Col} from '../../../src';
import Example from '../../fixtures/Example';
import {Markdown} from '../../fixtures/Markdown';


const examples = {
    basic: require('fs').readFileSync(__dirname + '/basic.js', 'utf8'),
    sizing: require('fs').readFileSync(__dirname + '/sizing.js', 'utf8'),
    select: require('fs').readFileSync(__dirname + '/select.js', 'utf8'),
    noCaret: require('fs').readFileSync(__dirname + '/noCaret.js', 'utf8'),
    dropup: require('fs').readFileSync(__dirname + '/dropup.js', 'utf8'),
    block: require('fs').readFileSync(__dirname + '/block.js', 'utf8')
};

export default React.createClass({
    render() {
        return (
            <Col md={9} sm={12}>
                <h1 className="page-header">
                    Dropdowns
                    <span className="page-header-en">
                        <code>Dropdown</code>、
                        <code>Dropdown.Item</code>
                    </span>
                </h1>


                <h3>默认样式</h3>
                <Example code={examples.basic} />

                <h3>大小</h3>
                <Example code={examples.sizing} />

                <Text>创建块级的Dropdown，给组件设置一个 <code>block</code> 属性</Text>
                <Example code={examples.block} />


                <h3>模拟 Select</h3>
                <Example code={examples.select} />

                <h3>没有小图标</h3>
                <Example code={examples.noCaret} />

                <h3>上拉按钮</h3>
                <Example code={examples.dropup} />


                <h3>组件属性</h3>
                <Markdown>
                    {require('./props.md') }
                </Markdown>

            </Col>
        );
    }
});
