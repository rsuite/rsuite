import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { findDOMNode } from 'react-dom';
import { getDOMNode, getInstance } from '@test/testUtils';
import CheckTreePicker from '../CheckTreePicker';

Enzyme.configure({ adapter: new Adapter() });

const data = [
  {
    label: 'Master',
    value: 'Master',
    children: [
      {
        label: 'tester0',
        value: 'tester0'
      },
      {
        label: 'tester1',
        value: 'tester1',
        children: [
          {
            label: 'tester2',
            value: 'tester2'
          }
        ]
      }
    ]
  },
  {
    label: 'Disabled node',
    value: 'disabled'
  }
];

describe('CheckTreePicker', () => {
  it('Should render default value', () => {
    const instance = getDOMNode(<CheckTreePicker data={data} defaultValue={['Master']} />);

    expect(
      instance.querySelector('.rs-picker-toggle-value .rs-picker-value-item').innerText
    ).to.equal('Master (All)');
  });

  it('Should clean selected value', () => {
    const instance = getDOMNode(<CheckTreePicker data={data} defaultValue={['Master']} />);

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle-clean'));
    expect(instance.querySelector('.rs-picker-toggle').innerText).to.equal('Select');
  });

  it('Should output a clean button', () => {
    const instance = getDOMNode(<CheckTreePicker data={data} defaultValue={['Master']} />);
    assert.ok(findDOMNode(instance).querySelector('.rs-picker-toggle-clean'));
  });

  it('Should render CheckTreePicker Menu', () => {
    const instance = getDOMNode(<CheckTreePicker data={data} />);

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle'));
    expect(document.querySelectorAll('.rs-picker-check-tree-menu').length).to.equal(1);
  });

  it('Should output a button', () => {
    const instance = getInstance(<CheckTreePicker toggleComponentClass="button" data={[]} />);
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'button'));
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<CheckTreePicker disabled data={[]} />);
    const instanceDom = findDOMNode(instance);
    assert.ok(instanceDom.className.match(/\bdisabled\b/));
  });

  it('Should be block', () => {
    const instance = getDOMNode(<CheckTreePicker block data={[]} />);
    const instanceDom = findDOMNode(instance);
    assert.ok(instanceDom.className.match(/\bblock\b/));
  });

  it('Should active 4 node by `value` when cascade is true', () => {
    const instance = getDOMNode(<CheckTreePicker inline data={data} value={['Master']} />);
    expect(instance.querySelectorAll('.rs-check-tree-node-checked').length).to.equal(4);
  });

  it('Should active 1 node by `value` when cascade is false', () => {
    const instance = getDOMNode(
      <CheckTreePicker inline cascade={false} data={data} value={['Master']} />
    );
    expect(instance.querySelectorAll('.rs-check-tree-node-checked').length).to.equal(1);
  });

  it('Should expand children nodes', () => {
    const instance = getDOMNode(
      <CheckTreePicker inline cascade={false} data={data} value={['Master']} />
    );

    ReactTestUtils.Simulate.click(instance.querySelectorAll('.rs-check-tree-node-expand-icon')[0]);
    expect(instance.querySelectorAll('.rs-check-tree-open').length).to.equal(1);
  });

  it('Should have a placeholder', () => {
    const instance = getDOMNode(<CheckTreePicker data={data} placeholder="test" />);
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.querySelector('.rs-picker-toggle-placeholder').innerText, 'test');
  });

  it('Should render value by `renderValue`', () => {
    const instance = getDOMNode(
      <CheckTreePicker
        data={[{ label: '1', value: '1' }, { label: '2', value: '2' }]}
        value={['1', '2']}
        renderValue={value => value.join(',')}
      />
    );
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.querySelector('.rs-picker-toggle-value').innerText, '1,2');
  });

  it('Should render a placeholder when value error', () => {
    const instance = getDOMNode(<CheckTreePicker placeholder="test" data={data} value={['4']} />);
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.querySelector('.rs-picker-toggle-placeholder').innerText, 'test');
  });

  it('Should call `onChange` callback with 1 values', done => {
    const doneOp = values => {
      if (values.length === 1) {
        done();
      }
    };
    const instance = getDOMNode(<CheckTreePicker inline onChange={doneOp} data={data} />);

    ReactTestUtils.Simulate.change(instance.querySelectorAll('.rs-check-tree-node input')[3]);
  });

  it('Should call `onClean` callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(
      <CheckTreePicker data={data} defaultValue={['tester0']} onClean={doneOp} />
    );

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle-clean'));
  });

  it('Should call `onOpen` callback', done => {
    const cb = () => {
      done();
    };

    const instance = getDOMNode(<CheckTreePicker onOpen={cb} data={data} />);
    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelector('.rs-picker-toggle'));
  });

  it('Should call `onClose` callback', done => {
    const cb = () => {
      done();
    };

    const instance = getDOMNode(<CheckTreePicker onClose={cb} data={data} />);
    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelector('.rs-picker-toggle'));
    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelector('.rs-picker-toggle'));
  });

  it('Should focus item by keyCode=40 ', () => {
    const instance = getInstance(<CheckTreePicker defaultOpen data={data} expandAll />);
    const toggle = instance.getToggleInstance().toggleRef.current;
    ReactTestUtils.Simulate.keyDown(toggle, { keyCode: 40 });
    ReactTestUtils.Simulate.keyDown(toggle, { keyCode: 40 });

    assert.equal(document.activeElement.innerText, 'tester0');
  });

  it('Should focus item by keyCode=38 ', () => {
    ReactTestUtils.Simulate.keyDown(document.activeElement, { keyCode: 40 });
    ReactTestUtils.Simulate.keyDown(document.activeElement, { keyCode: 38 });
    assert.equal(document.activeElement.innerText, 'tester0');
  });

  it('Should focus item by keyCode=13 ', done => {
    const doneOp = values => {
      done();
    };

    const instance = mount(
      <CheckTreePicker data={data} onChange={doneOp} inline cascade={false} expandAll />
    );

    instance.find('span[data-key="0-0"]').simulate('click');
    expect(instance.find('span[data-key="0-0"]').getElement() === document.activeElement);

    instance.find('span[data-key="0-0"]').simulate('keydown', {
      keyCode: 13
    });
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<CheckTreePicker className="custom" data={data} />);
    assert.include(findDOMNode(instance).className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<CheckTreePicker style={{ fontSize }} data={data} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should have a custom menuStyle', () => {
    const fontSize = '12px';
    const instance = getInstance(<CheckTreePicker menuStyle={{ fontSize }} data={data} open />);
    assert.equal(findDOMNode(instance.menuRef.current).style.fontSize, fontSize);
  });

  it('Should load data async', () => {
    let activeNode = null;
    let layer = 0;
    const data = [
      {
        label: 'Master',
        value: 'Master'
      },
      {
        label: 'async',
        value: 'async',
        children: []
      }
    ];
    const children = [
      {
        label: 'children1',
        value: 'children1'
      }
    ];

    let newData = [];
    const mockOnExpand = (node, l, concat) => {
      activeNode = node;
      layer = l;
      newData = concat(data, children);
    };

    const instance = mount(
      <CheckTreePicker data={data} onExpand={mockOnExpand} inline cascade={false} expandAll />
    );
    instance.find('div[data-ref="0-1"]  > .rs-check-tree-node-expand-icon').simulate('click');

    console.log(newData);
    // TODO
    //instance.setProps({ data: newData });

    assert.equal(instance.html().indexOf('data-key="0-1-0"') > -1, true);

    instance.unmount();
  });

  it('Should expandAll nodes when `expandAll` setting true', () => {
    const instance = mount(<CheckTreePicker data={data} inline />);

    instance.setProps({
      expandAll: false
    });
    assert.equal(instance.find('.rs-check-tree-open').length, 0);

    instance.setProps({
      expandAll: true
    });
    assert.equal(instance.find('.rs-check-tree-open').length, 2);
    instance.unmount();
  });

  it('Should render empty tree when searchKeyword is `name`', () => {
    const instance = mount(<CheckTreePicker data={data} inline searchKeyword="name" />);
    assert.equal(instance.find('.rs-check-tree-node').length, 0);
    instance.unmount();
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<CheckTreePicker data={data} classPrefix="custom-prefix" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });

  it('should render tree without checkbox', () => {
    const instance = mount(
      <CheckTreePicker
        data={data}
        inline
        uncheckableItemValues={['tester0', 'disabled', 'tester1', 'tester2', 'Master']}
      />
    );

    assert.equal(instance.find('.rs-check-tree-node-input-wrapper').length, 0);
  });

  it('should render tree node with custom dom', () => {
    const customData = [
      {
        value: '1',
        label: <span className="custom-label">1</span>
      }
    ];
    const instance = mount(<CheckTreePicker data={customData} inline />);

    assert.equal(instance.find('.custom-label').length, 1);
  });
});
