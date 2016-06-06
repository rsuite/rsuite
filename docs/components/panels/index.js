import React from 'react';
import { Text, Col } from '../../../src';
import Example from '../../fixtures/Example';
import { Markdown } from '../../fixtures/Markdown';


const examples = {
    basic: require('fs').readFileSync(__dirname + '/basic.js', 'utf8'),
    panelGroup: require('fs').readFileSync(__dirname + '/panelGroup.js', 'utf8'),
    controlledPanelGroup: require('fs').readFileSync(__dirname + '/controlledPanelGroup.js', 'utf8')
};

export default React.createClass({
    render() {
        return (
            <Col md={9} sm={12}>
                <h1 className="page-header">
                    Panels
                    <span className="page-header-en">
                        <code>Panel</code>、
                        <code>PanelGroup</code>
                    </span>
                </h1>

                <h3>默认样式</h3>
                <Example code={examples.basic} />

                <h3>面板组</h3>
                <Example code={examples.panelGroup} />

                <h3>受控面板组</h3>
                <Example code={examples.controlledPanelGroup} />

                <h3>组件属性</h3>
                <Markdown>
                    {require('./props.md') }
                </Markdown>

            </Col>
        );
    }
});
