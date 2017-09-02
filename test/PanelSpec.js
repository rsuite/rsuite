import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';


import Panel from '../src/Panel';
import innerText from './innerText';

describe('Panel', () => {

  it('Should render a panel', () => {
    const title = 'Test';
    const instance = ReactTestUtils.renderIntoDocument(
      <Panel>{title}</Panel>
    );
    assert.equal(findDOMNode(instance).tagName, 'DIV');
    assert.ok(findDOMNode(instance).className.match(/\bpanel\b/));
    assert.equal(innerText(findDOMNode(instance)), title);
  });

  it('Should default expanded', () => {

    const instance = ReactTestUtils.renderIntoDocument(
      <Panel collapsible defaultExpanded />
    );
    assert.ok(findDOMNode(instance).querySelector('.panel-collapse.in'));
  });

  it('Should be expanded', () => {

    const instance = ReactTestUtils.renderIntoDocument(
      <Panel collapsible expanded />
    );
    assert.ok(findDOMNode(instance).querySelector('.panel-collapse.in'));
  });

  it('Should render the custom header', () => {

    const instance = ReactTestUtils.renderIntoDocument(
      <Panel header={<a>abc</a>} />
    );
    assert.equal(innerText(findDOMNode(instance).querySelector('a.panel-title')), 'abc');
  });




  it('Should have a role in header', () => {

    const instance = ReactTestUtils.renderIntoDocument(
      <Panel headerRole="button" collapsible header={'abc'} />
    );
    assert.equal(findDOMNode(instance).querySelector('h4 a').getAttribute('role'), 'button');
  });

  it('Should have a role in header', () => {

    const instance = ReactTestUtils.renderIntoDocument(
      <Panel panelRole="button" collapsible />
    );
    assert.equal(findDOMNode(instance).querySelector('.panel-collapse').getAttribute('role'), 'button');
  });


  it('Should call onSelect callback', (done) => {
    const doneOp = (eventKey) => {
      if (eventKey === 12) {
        done();
      }
    };

    const instance = ReactTestUtils.renderIntoDocument(
      <Panel onSelect={doneOp} eventKey={12} header={'abc'} />
    );
    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelector('.panel-heading'));
  });


  it('Should pass transition callbacks to Collapse', (done) => {
    let count = 0;
    const increment = () => {
      count += 1;
    };

    let title;

    const instance = ReactTestUtils.renderIntoDocument(
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

    title = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'panel-title');
    ReactTestUtils.Simulate.click(title.firstChild);
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Panel className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });


  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <Panel style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
