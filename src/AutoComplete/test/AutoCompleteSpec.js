import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import AutoComplete from '../AutoComplete';
import { getDOMNode, renderIntoDocument } from '@test/testUtils';

describe('AutoComplete', () => {
  it('Should render input', () => {
    const instance = getDOMNode(<AutoComplete />);
    assert.ok(instance.querySelector('input'));
  });

  it('Should render 2 `li` when set `open` and `defaultValue`', () => {
    const ref = React.createRef();
    renderIntoDocument(<AutoComplete ref={ref} data={['a', 'b', 'ab']} open defaultValue="a" />);
    assert.equal(findDOMNode(ref.current.menu).querySelectorAll('li').length, 2);
  });

  it('Should be a `top-end` for placement', () => {
    const ref = React.createRef();
    renderIntoDocument(<AutoComplete ref={ref} open placement="topEnd" />);
    const classes = findDOMNode(ref.current.menu).className;
    assert.include(classes, 'placement-top-end');
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
    const ref = React.createRef();
    renderIntoDocument(
      <AutoComplete ref={ref} data={['a', 'b', 'ab']} open defaultValue="a" onSelect={doneOp} />
    );
    ReactTestUtils.Simulate.click(findDOMNode(ref.current.menu).querySelectorAll('a')[0]);
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

  it('Should call onBlur callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<AutoComplete onBlur={doneOp} />);
    const input = instance.querySelector('input');
    ReactTestUtils.Simulate.blur(input);
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
    const ref = React.createRef();
    renderIntoDocument(
      <AutoComplete ref={ref} defaultValue="a" onKeyDown={doneOp} data={['a', 'b']} open />
    );
    ReactTestUtils.Simulate.keyDown(findDOMNode(ref.current.menu));
  });

  it('Should call onMenuFocus callback when keyCode=40', done => {
    const doneOp = () => {
      done();
    };
    const ref = React.createRef();
    renderIntoDocument(
      <AutoComplete ref={ref} defaultValue="a" onMenuFocus={doneOp} data={['a', 'ab', 'ac']} open />
    );
    ReactTestUtils.Simulate.keyDown(findDOMNode(ref.current.menu), {
      keyCode: 40
    });
  });

  it('Should call onMenuFocus callback when keyCode=38', done => {
    let i = 0;
    const doneOp = () => {
      i++;
      if (i === 2) {
        done();
      }
    };
    const ref = React.createRef();
    renderIntoDocument(
      <AutoComplete ref={ref} defaultValue="a" onMenuFocus={doneOp} data={['a', 'ab', 'ac']} open />
    );
    ReactTestUtils.Simulate.keyDown(findDOMNode(ref.current.menu), {
      keyCode: 40
    });
    ReactTestUtils.Simulate.keyDown(findDOMNode(ref.current.menu), {
      keyCode: 38
    });
  });

  it('Should call onChange callback when keyCode=13', done => {
    const doneOp = () => {
      done();
    };
    const ref = React.createRef();
    renderIntoDocument(
      <AutoComplete ref={ref} defaultValue="a" onChange={doneOp} data={['a', 'ab', 'ac']} open />
    );
    ReactTestUtils.Simulate.keyDown(findDOMNode(ref.current.menu), {
      keyCode: 40
    });
    ReactTestUtils.Simulate.keyDown(findDOMNode(ref.current.menu), {
      keyCode: 13
    });
  });

  it('Should call onSelect callback with selected item when keyCode=13', done => {
    const doneOp = ({ value }) => {
      assert.equal(value, 'ab');
      done();
    };
    const ref = React.createRef();
    renderIntoDocument(
      <AutoComplete ref={ref} defaultValue="a" onSelect={doneOp} data={['a', 'ab', 'ac']} open />
    );
    ReactTestUtils.Simulate.keyDown(findDOMNode(ref.current.menu), {
      keyCode: 40
    });
    ReactTestUtils.Simulate.keyDown(findDOMNode(ref.current.menu), {
      keyCode: 13
    });
  });

  it("Shouldn't call onSelect nor onChange callback on Enter pressed if selectOnEnter=false", () => {
    const onSelectSpy = sinon.spy();
    const ref = React.createRef();
    renderIntoDocument(
      <AutoComplete
        ref={ref}
        defaultValue="a"
        onSelect={onSelectSpy}
        onChange={onSelectSpy}
        selectOnEnter={false}
        data={['a', 'ab', 'ac']}
        open
      />
    );
    ReactTestUtils.Simulate.keyDown(findDOMNode(ref.current.menu), {
      keyCode: 40
    });
    ReactTestUtils.Simulate.keyDown(findDOMNode(ref.current.menu), {
      keyCode: 13
    });

    assert.ok(!onSelectSpy.calledOnce);
  });

  it('Should call onClose callback when keyCode=27', done => {
    const doneOp = () => {
      done();
    };
    const ref = React.createRef();
    renderIntoDocument(
      <AutoComplete ref={ref} defaultValue="a" onClose={doneOp} data={['a', 'ab', 'ac']} open />
    );
    ReactTestUtils.Simulate.keyDown(findDOMNode(ref.current.menu), {
      keyCode: 27
    });
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
    const ref = React.createRef();
    renderIntoDocument(
      <AutoComplete
        ref={ref}
        data={['a', 'b', 'ab']}
        open
        defaultValue="a"
        renderItem={() => <i className="icon" />}
      />
    );

    assert.equal(findDOMNode(ref.current.menu).querySelectorAll('a i').length, 2);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<AutoComplete className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a menuClassName', () => {
    const ref = React.createRef();
    renderIntoDocument(
      <AutoComplete ref={ref} menuClassName="custom" data={['a', 'b', 'ab']} open />
    );
    assert.include(findDOMNode(ref.current.menu).className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<AutoComplete style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<AutoComplete classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should have a custom filter function', () => {
    const ref1 = React.createRef();
    renderIntoDocument(
      <AutoComplete
        ref={ref1}
        data={['a', 'b', 'ab']}
        open
        defaultValue="a"
        filterBy={() => true}
      />
    );

    assert.equal(findDOMNode(ref1.current.menu).querySelectorAll('li').length, 3);

    const ref2 = React.createRef();
    renderIntoDocument(
      <AutoComplete
        ref={ref2}
        data={['a', 'b', 'ab']}
        open
        defaultValue="a"
        filterBy={() => false}
      />
    );

    assert.equal(findDOMNode(ref2.current.menu).querySelectorAll('li').length, 0);

    const ref3 = React.createRef();
    renderIntoDocument(
      <AutoComplete
        ref={ref3}
        data={['a', 'b', 'ab']}
        open
        defaultValue="a"
        // filterBy value only, so all item will be displayed
        filterBy={value => value === 'a'}
      />
    );

    assert.equal(findDOMNode(ref3.current.menu).querySelectorAll('li').length, 3);

    const ref4 = React.createRef();
    renderIntoDocument(
      <AutoComplete
        ref={ref4}
        data={['a', 'b', 'ab']}
        open
        defaultValue="a"
        filterBy={(_, item) => item.label && item.label.length >= 2}
      />
    );

    assert.equal(findDOMNode(ref4.current.menu).querySelectorAll('li').length, 1);
  });

  describe('ref testing', () => {
    it('Should call onOpen', done => {
      const doneOp = () => {
        done();
      };
      const ref = React.createRef();
      renderIntoDocument(
        <AutoComplete ref={ref} defaultValue="a" onOpen={doneOp} data={['a', 'ab', 'ac']} open />
      );
      ref.current.open();
    });

    it('Should call onClose', done => {
      const doneOp = () => {
        done();
      };
      const ref = React.createRef();
      renderIntoDocument(
        <AutoComplete ref={ref} defaultValue="a" onClose={doneOp} data={['a', 'ab', 'ac']} open />
      );
      ref.current.open();
      ref.current.close();
    });
  });
});
