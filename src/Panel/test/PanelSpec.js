import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Panel from '../Panel';
import { getDOMNode, innerText, render } from '@test/testUtils';

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
    assert.isNotNull(instance.querySelector('.rs-panel-collapse.rs-anim-in'));
  });

  it('Should show border', () => {
    const instance = getDOMNode(<Panel bordered />);
    assert.include(instance.className, 'rs-panel-bordered');
  });

  it('Should with shadow', () => {
    const instance = getDOMNode(<Panel shaded />);
    assert.include(instance.className, 'rs-panel-shaded');
  });

  it('Should be expanded', () => {
    const instance = getDOMNode(<Panel collapsible expanded />);
    assert.isNotNull(instance.querySelector('.rs-panel-collapse.rs-anim-in'));
  });

  it('Should render the custom header', () => {
    const instance = getDOMNode(<Panel header={<a>abc</a>} />);
    assert.equal(innerText(instance.querySelector('a.rs-panel-title')), 'abc');
  });

  it('Should have a role in header', () => {
    const instance = getDOMNode(<Panel headerRole="button" collapsible header={'abc'} />);
    assert.equal(instance.querySelector('.rs-panel-header').getAttribute('role'), 'button');
  });

  it('Should have a role in body', () => {
    const instance = getDOMNode(<Panel panelRole="button" collapsible />);
    assert.equal(instance.querySelector('.rs-panel-body').getAttribute('role'), 'button');
  });

  it('Should call onSelect callback', () => {
    const onSelectSpy = sinon.spy();
    const instance = getDOMNode(
      <Panel collapsible onSelect={onSelectSpy} eventKey={12} header={'abc'} />
    );

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-panel-header'));
    expect(onSelectSpy).to.have.been.calledWith(12);
  });

  it('Should pass transition callbacks to Collapse', done => {
    let count = 0;
    const increment = () => {
      count += 1;
    };
    const ref = React.createRef();
    let title;
    render(
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
        ref={ref}
      >
        Panel content
      </Panel>
    );

    title = ref.current.querySelector('.rs-panel-title');
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
    assert.include(instance.className, 'custom-prefix');
  });
});
