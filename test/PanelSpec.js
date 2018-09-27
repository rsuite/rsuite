import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Checkbox from '../src/Checkbox';
import Panel from '../src/Panel';
import innerText from './innerText';
import { getDOMNode, getInstance } from './TestWrapper';

describe('Panel', () => {
  it('Should render a panel', () => {
    const title = 'Test';
    const instance = getDOMNode(<Panel>{title}</Panel>);
    assert.equal(instance.tagName, 'DIV');
    assert.ok(instance.className.match(/\bpanel\b/));
    assert.equal(innerText(instance), title);
  });

  it('Should default expanded', () => {
    const instance = getDOMNode(<Panel collapsible defaultExpanded />);
    assert.ok(instance.querySelector('.rs-panel-collapse.in'));
  });

  it('Should be expanded', () => {
    const instance = getDOMNode(<Panel collapsible expanded />);
    assert.ok(instance.querySelector('.rs-panel-collapse.in'));
  });

  it('Should render the custom header', () => {
    const instance = getDOMNode(<Panel header={<a>abc</a>} />);
    assert.equal(innerText(instance.querySelector('a.rs-panel-title')), 'abc');
  });

  it('Should have a role in header', () => {
    const instance = getDOMNode(<Panel headerRole="button" collapsible header={'abc'} />);
    assert.equal(instance.querySelector('h4 a').getAttribute('role'), 'button');
  });

  it('Should have a role in header', () => {
    const instance = getDOMNode(<Panel panelRole="button" collapsible />);
    assert.equal(instance.querySelector('.rs-panel-collapse').getAttribute('role'), 'button');
  });

  it('Should call onSelect callback', done => {
    const doneOp = eventKey => {
      if (eventKey === 12) {
        done();
      }
    };

    const instance = getDOMNode(<Panel onSelect={doneOp} eventKey={12} header={'abc'} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-panel-heading'));
  });

  it('Should pass transition callbacks to Collapse', done => {
    let count = 0;
    const increment = () => {
      count += 1;
    };

    let title;

    const instance = getInstance(
      <Panel
        collapsible
        defaultExpanded={false}
        header="Click me"
        onExit={increment}
        onExiting={increment}
        onExited={() => {
          increment();
          if (count === 6) {
            done();
          }
        }}
        onEnter={increment}
        onEntering={increment}
        onEntered={() => {
          increment();
          ReactTestUtils.Simulate.click(title.firstChild);
        }}
      >
        Panel content
      </Panel>
    );

    title = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'rs-panel-title');
    ReactTestUtils.Simulate.click(title.firstChild);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Panel className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Panel style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Panel classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
