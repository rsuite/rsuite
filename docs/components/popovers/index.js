import React from 'react';
import {Text, Col} from '../../../src';
import Example from '../../fixtures/Example';
import {Markdown} from '../../fixtures/Markdown';


const examples = {
    basic: require('fs').readFileSync(__dirname + '/basic.js', 'utf8'),
    trigger: require('fs').readFileSync(__dirname + '/trigger.js', 'utf8')
};

export default React.createClass({
    render() {
        return (
            <Col md={9} sm={12}>
                <h1 className="page-header">
                    Popovers
                    <span className="page-header-en">
                        <code>Whisper</code>、
                        <code>Popover</code>
                    </span>
                </h1>

                <h3>默认样式</h3>
                <Example code={examples.basic} />


                <h3>触发方式</h3>
                <p>
                    有三种方式可以触发提示 <code>Popover</code> 的信息:
                    <code>click</code>、
                    <code>focus</code>、
                    <code>hover</code>
                </p>
                <Example code={examples.trigger} />

                <h3>组件属性</h3>

                <Markdown>
                    {require('./props.md') }
                </Markdown>

            </Col>
        );
    }
});
