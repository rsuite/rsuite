import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import AutoComplete from '../src/AutoComplete';
import { getDOMNode, getInstance } from './TestWrapper';

describe('AutoComplete', () => {
  it('Should render input', () => {
    const instance = getInstance(<AutoComplete />);

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'input'));
  });

  it('Should render 2 `li` when set `open` and `defaultValue`', () => {
    const instance = getInstance(<AutoComplete data={['a', 'b', 'ab']} open defaultValue="a" />);
    assert.equal(findDOMNode(instance.menuContainer).querySelectorAll('li').length, 2);
  });

  it('Should be a `top-right` for placement', () => {
    const instance = getInstance(<AutoComplete open placement="topRight" />);
    const classes = findDOMNode(instance.menuContainer).className;
    assert.include(classes, 'rs-placement-top-right');
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<AutoComplete disabled />);
    assert.include(instance.className, 'rs-auto-complete-disabled');
  });

  it('Should call onSelect callback', done => {
    const doneOp = item => {
      if (item.value === 'a') {
        done();
      }
    };
    const instance = getInstance(
      <AutoComplete data={['a', 'b', 'ab']} open defaultValue="a" onSelect={doneOp} />
    );
    ReactTestUtils.Simulate.click(findDOMNode(instance.menuContainer).querySelectorAll('a')[0]);
  });

  it('Should call onChange callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<AutoComplete onChange={doneOp} />);
    const input = instance.querySelector('input');

    input.value = 'a';

    ReactTestUtils.Simulate.change(input);
  });

  it('Should call onFocus callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<AutoComplete onFocus={doneOp} />);
    const input = instance.querySelector('input');
    ReactTestUtils.Simulate.focus(input);
  });

  it('Should call onKeyDown callback on input', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<AutoComplete onKeyDown={doneOp} data={['a', 'b', 'ab']} open />);
    const input = instance.querySelector('input');
    ReactTestUtils.Simulate.keyDown(input);
  });

  it('Should call onKeyDown callback on menu', done => {
    const doneOp = () => {
      done();
    };
    const instance = getInstance(
      <AutoComplete defaultValue="a" onKeyDown={doneOp} data={['a', 'b']} open />
    );
    ReactTestUtils.Simulate.keyDown(findDOMNode(instance.menuContainer));
  });

  it('Should call onMenuFocus callback when keyCode=40', done => {
    const doneOp = () => {
      done();
    };
    const instance = getInstance(
      <AutoComplete defaultValue="a" onMenuFocus={doneOp} data={['a', 'ab', 'ac']} open />
    );
    ReactTestUtils.Simulate.keyDown(findDOMNode(instance.menuContainer), { keyCode: 40 });
  });

  it('Should call onMenuFocus callback when keyCode=38', done => {
    let i = 0;
    const doneOp = () => {
      i++;
      if (i === 2) {
        done();
      }
    };
    const instance = getInstance(
      <AutoComplete defaultValue="a" onMenuFocus={doneOp} data={['a', 'ab', 'ac']} open />
    );
    ReactTestUtils.Simulate.keyDown(findDOMNode(instance.menuContainer), { keyCode: 40 });
    ReactTestUtils.Simulate.keyDown(findDOMNode(instance.menuContainer), { keyCode: 38 });
  });

  it('Should call onChange callback when keyCode=13', done => {
    const doneOp = () => {
      done();
    };
    const instance = getInstance(
      <AutoComplete defaultValue="a" onChange={doneOp} data={['a', 'ab', 'ac']} open />
    );
    ReactTestUtils.Simulate.keyDown(findDOMNode(instance.menuContainer), { keyCode: 40 });
    ReactTestUtils.Simulate.keyDown(findDOMNode(instance.menuContainer), { keyCode: 13 });
  });

  it('Should call onSelect callback when keyCode=13', done => {
    const doneOp = () => {
      done();
    };
    const instance = getInstance(
      <AutoComplete defaultValue="a" onSelect={doneOp} data={['a', 'ab', 'ac']} open />
    );
    ReactTestUtils.Simulate.keyDown(findDOMNode(instance.menuContainer), { keyCode: 40 });
    ReactTestUtils.Simulate.keyDown(findDOMNode(instance.menuContainer), { keyCode: 13 });
  });

  it("Shouldn't call onSelect callback on Enter pressed if selectOnEnter=false", () => {
    const onSelectSpy = sinon.spy();
    const instance = getInstance(
      <AutoComplete
        defaultValue="a"
        onSelect={onSelectSpy}
        selectOnEnter={false}
        data={['a', 'ab', 'ac']}
        open
      />
    );
    ReactTestUtils.Simulate.keyDown(findDOMNode(instance.menuContainer), { keyCode: 40 });
    ReactTestUtils.Simulate.keyDown(findDOMNode(instance.menuContainer), { keyCode: 13 });

    assert.ok(!onSelectSpy.calledOnce);
  });

  it('Should call onClose callback when keyCode=27', done => {
    const doneOp = () => {
      done();
    };
    const instance = getInstance(
      <AutoComplete defaultValue="a" onClose={doneOp} data={['a', 'ab', 'ac']} open />
    );
    ReactTestUtils.Simulate.keyDown(findDOMNode(instance.menuContainer), { keyCode: 27 });
  });

  it('Should call onBlur callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<AutoComplete data={['a', 'b', 'ab']} onBlur={doneOp} />);
    const input = instance.querySelector('input');
    ReactTestUtils.Simulate.blur(input);
  });

  it('Should render a icon in li', () => {
    const instance = getInstance(
      <AutoComplete
        data={['a', 'b', 'ab']}
        open
        defaultValue="a"
        renderItem={() => <i className="icon" />}
      />
    );

    assert.equal(findDOMNode(instance.menuContainer).querySelectorAll('a i').length, 2);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<AutoComplete className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a menuClassName', () => {
    const instance = getInstance(
      <AutoComplete menuClassName="custom" data={['a', 'b', 'ab']} open />
    );
    assert.include(findDOMNode(instance.menuContainer).className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<AutoComplete style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });
});
