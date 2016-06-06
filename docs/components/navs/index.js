import React from 'react';
import {Text, Col} from '../../../src';
import Example from '../../fixtures/Example';
import {Markdown} from '../../fixtures/Markdown';


const examples = {
    basic: require('fs').readFileSync(__dirname + '/basic.js', 'utf8'),
    pills: require('fs').readFileSync(__dirname + '/pills.js', 'utf8'),
    tabs: require('fs').readFileSync(__dirname + '/tabs.js', 'utf8'),
    stacked: require('fs').readFileSync(__dirname + '/stacked.js', 'utf8'),
    justified: require('fs').readFileSync(__dirname + '/justified.js', 'utf8'),
    dropdown: require('fs').readFileSync(__dirname + '/dropdown.js', 'utf8')
};

export default React.createClass({
    render() {
        return (
            <Col md={9} sm={12}>
                <h1 className="page-header">
                    Navs
                    <span className="page-header-en">
                        <code>Nav</code>、
                        <code>Nav.Item</code>
                    </span>
                </h1>

                <h3>默认样式</h3>
                <Example code={examples.basic} />

                <h3>胶囊式标签</h3>
                <Example code={examples.pills} />

                <h3>标签式导航</h3>
                <Example code={examples.tabs} />

                <h3>垂直导航</h3>
                <Example code={examples.stacked} />

                <h3>宽度自适应</h3>
                <Example code={examples.justified} />

                <h3>混入下拉按钮</h3>
                <Example code={examples.dropdown} />


                <h3>组件属性</h3>
                <Markdown>
                    {require('./props.md') }
                </Markdown>


            </Col>
        );
    }
});
