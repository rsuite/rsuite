import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { getDOMNode, getInstance } from '@test/testUtils';
import TreePicker from '../TreePicker';
import { KEY_CODE } from '../../utils';

Enzyme.configure({ adapter: new Adapter() });

export const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

const itemFocusClassName = '.rs-tree-node-focus';
const itemExpandedClassName = '.rs-tree-node-expanded';

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

describe('TreePicker', () => {
  it('Should render default value', () => {
    const instance = getDOMNode(<TreePicker defaultOpen data={data} defaultValue={'Master'} />);

    expect(instance.querySelector('.rs-picker-toggle-value').innerText).to.equal('Master');
  });

  it('Should clean selected value', () => {
    const instance = getDOMNode(<TreePicker defaultOpen data={data} defaultValue={'Master'} />);

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle-clean'));
    expect(instance.querySelector('.rs-picker-toggle').innerText).to.equal('Select');
  });

  it('Should output a clean button', () => {
    const instance = getDOMNode(<TreePicker defaultOpen data={data} defaultValue={'Master'} />);
    assert.ok(instance.querySelector('.rs-picker-toggle-clean'));
  });

  it('Should render TreePicker Menu', () => {
    const instance = getInstance(<TreePicker defaultOpen data={data} />);
    expect(instance.overlay.classList.contains('.rs-picker-tree-menu'));
  });

  it('Should output a button', () => {
    const instance = getDOMNode(<TreePicker toggleAs="button" data={[]} />);

    assert.ok(instance.querySelector('button'));
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<TreePicker disabled data={[]} />);

    assert.ok(instance.className.match(/\bdisabled\b/));
  });

  it('Should be block', () => {
    const instance = getDOMNode(<TreePicker block data={[]} />);

    assert.ok(instance.className.match(/\bblock\b/));
  });

  it('Should active one node by `value`', () => {
    const instance = mount(<TreePicker virtualized={false} inline data={data} value={'Master'} />);
    expect(instance.find('.rs-tree-node-active').length).to.equal(1);
  });

  it('Should expand children nodes', () => {
    const instance = mount(
      <TreePicker virtualized={false} inline cascade={false} data={data} value={['Master']} />
    );

    instance.find('div[data-ref="0-0"]  > .rs-tree-node-expand-icon').simulate('click');
    expect(instance.find('.rs-tree-open').length).to.equal(1);
  });

  it('Should have a placeholder', () => {
    const instance = getDOMNode(<TreePicker data={data} placeholder="test" />);

    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').innerText, 'test');
  });

  it('Should render value by `renderValue()`', () => {
    const placeholder = 'value';

    // valid value
    const instance1 = getDOMNode(
      <TreePicker
        data={[
          { label: '1', value: '1' },
          { label: '2', value: '2' }
        ]}
        value={'2'}
        renderValue={(value, item) => `Selected: ${item.label}`}
      />
    );

    // invalid value
    const instance2 = getDOMNode(
      <TreePicker
        data={[
          { label: '1', value: '1' },
          { label: '2', value: '2' }
        ]}
        value={'5'}
        renderValue={v => [v, placeholder]}
      />
    );

    // invalid value
    const instance3 = getDOMNode(
      <TreePicker
        placeholder={placeholder}
        data={[]}
        value={null}
        renderValue={v => [v, placeholder]}
      />
    );

    assert.equal(instance1.querySelector('.rs-picker-toggle-value').innerText, 'Selected: 2');
    assert.equal(instance2.querySelector('.rs-picker-toggle-value').innerText, `5${placeholder}`);
    assert.equal(instance3.querySelector('.rs-picker-toggle-placeholder').innerText, placeholder);
  });

  it('Should call renderValue', () => {
    const instance1 = getDOMNode(<TreePicker value="Test" renderValue={() => '1'} />);
    const instance2 = getDOMNode(<TreePicker value="Test" renderValue={() => null} />);
    const instance3 = getDOMNode(<TreePicker value="Test" renderValue={() => undefined} />);

    assert.equal(instance1.querySelector('.rs-picker-toggle-value').innerText, '1');
    assert.equal(instance2.querySelector('.rs-picker-toggle-placeholder').innerText, 'Select');
    assert.equal(instance3.querySelector('.rs-picker-toggle-placeholder').innerText, 'Select');
  });

  it('Should not be call renderValue()', () => {
    const instance = getDOMNode(<TreePicker data={[]} renderValue={() => 'value'} />);
    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').innerText, 'Select');
  });

  it('Should render a placeholder when value error', () => {
    const instance = getDOMNode(<TreePicker placeholder="test" data={data} value={['4']} />);

    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').innerText, 'test');
  });

  it('Should call `onChange` callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = mount(<TreePicker virtualized={false} inline onChange={doneOp} data={data} />);

    instance.find('span[data-key="0-0"]').simulate('click');
  });

  it('Should call `onClean` callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(
      <TreePicker defaultOpen data={data} defaultValue={'tester0'} onClean={doneOp} />
    );

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle-clean'));
  });

  it('Should call `onOpen` callback', done => {
    const cb = () => {
      done();
    };

    const instance = getDOMNode(<TreePicker onOpen={cb} data={data} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle'));
  });

  it('Should call `onClose` callback', done => {
    const cb = () => {
      done();
    };

    const instance = getDOMNode(<TreePicker onClose={cb} data={data} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle'));
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle'));
  });

  it('Should focus item by keyCode=40', () => {
    const instance = getInstance(
      <TreePicker open data={data} virtualized={false} defaultExpandAll value="tester1" />
    );
    ReactTestUtils.Simulate.keyDown(instance.target, { keyCode: KEY_CODE.DOWN });

    assert.equal(instance.overlay.querySelector(itemFocusClassName).innerText, 'Master');
  });

  it('Should focus item by keyCode=38 ', () => {
    const instance = getInstance(
      <TreePicker open data={data} virtualized={false} defaultExpandAll value="tester1" />
    );

    ReactTestUtils.Simulate.click(instance.overlay.querySelector('span[data-key="0-0-1"]'));
    ReactTestUtils.Simulate.keyDown(instance.target, { keyCode: KEY_CODE.UP });
    assert.equal(instance.overlay.querySelector(itemFocusClassName).innerText, 'tester0');
  });

  it('Should focus item by keyCode=13 ', done => {
    const doneOp = () => {
      done();
    };
    const instance = getInstance(
      <TreePicker defaultOpen virtualized={false} data={data} onChange={doneOp} defaultExpandAll />
    );
    ReactTestUtils.Simulate.click(instance.overlay.querySelector('span[data-key="0-0-1"]'));
  });

  /**
   * When focus is on an open node, closes the node.
   */
  it('Should fold children node by keyCode=37', () => {
    const tree = getInstance(
      <TreePicker defaultOpen data={data} virtualized={false} defaultExpandAll />
    );

    ReactTestUtils.Simulate.click(tree.overlay.querySelector('span[data-key="0-0"]'));
    ReactTestUtils.Simulate.keyDown(tree.overlay, { keyCode: KEY_CODE.LEFT });
    assert.equal(
      tree.overlay.querySelectorAll(`div[data-ref="0-0"] > ${itemExpandedClassName}`).length,
      0
    );
  });

  /**
   * When focus is on a root node that is also either an end node or a closed node, does nothing.
   */
  it('Should change nothing when trigger on root node by keyCode=37', () => {
    const tree = getInstance(
      <TreePicker defaultOpen data={data} virtualized={false} defaultExpandAll />
    );

    ReactTestUtils.Simulate.click(tree.overlay.querySelector('span[data-key="0-0"]'));
    ReactTestUtils.Simulate.keyDown(tree.overlay, { keyCode: KEY_CODE.LEFT });
    assert.equal(tree.overlay.querySelector(itemFocusClassName).innerText, 'Master');

    assert.equal(
      tree.overlay.querySelectorAll(`div[data-ref="0-0"] > ${itemExpandedClassName}`).length,
      0
    );
  });

  /**
   * When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.
   */
  it('Should focus on parentNode when trigger on leaf node by keyCode=37', () => {
    const tree = getInstance(
      <TreePicker defaultOpen data={data} virtualized={false} defaultExpandAll />
    );

    ReactTestUtils.Simulate.click(tree.overlay.querySelector('span[data-key="0-0"]'));
    ReactTestUtils.Simulate.keyDown(tree.overlay, { keyCode: KEY_CODE.LEFT });
    assert.equal(tree.overlay.querySelector(itemFocusClassName).innerText, 'Master');
  });

  /**
   * When focus is on a closed node, opens the node; focus does not move.
   */
  it('Should fold children node by keyCode=39', () => {
    const tree = getInstance(<TreePicker defaultOpen data={data} virtualized={false} />);

    ReactTestUtils.Simulate.click(tree.overlay.querySelector('span[data-key="0-0"]'));
    ReactTestUtils.Simulate.keyDown(tree.overlay, { keyCode: KEY_CODE.RIGHT });
    assert.equal(
      tree.overlay.querySelectorAll(`div[data-ref="0-0"] > ${itemExpandedClassName}`).length,
      1
    );
  });

  /**
   * When focus is on an end node, does nothing.
   */
  it('Should change nothing when trigger on leaf node by keyCode=39', () => {
    const tree = getInstance(
      <TreePicker defaultOpen data={data} virtualized={false} defaultExpandAll />
    );

    ReactTestUtils.Simulate.click(tree.overlay.querySelector('span[data-key="0-0-0"]'));
    ReactTestUtils.Simulate.keyDown(tree.overlay, { keyCode: KEY_CODE.RIGHT });
    assert.equal(tree.overlay.querySelector(itemFocusClassName).innerText, 'tester0');
  });

  /**
   * When focus is on a open node, moves focus to the first child node.
   */
  it('Should focus on first child node when node expanded by keyCode=39', () => {
    const tree = getInstance(
      <TreePicker defaultOpen data={data} virtualized={false} defaultExpandAll />
    );

    ReactTestUtils.Simulate.click(tree.overlay.querySelector('span[data-key="0-0"]'));
    ReactTestUtils.Simulate.keyDown(tree.overlay, { keyCode: KEY_CODE.RIGHT });
    assert.equal(tree.overlay.querySelector(itemFocusClassName).innerText, 'tester0');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<TreePicker className="custom" data={data} />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<TreePicker style={{ fontSize }} data={data} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom menuStyle', () => {
    const fontSize = '12px';
    const instance = getInstance(<TreePicker open menuStyle={{ fontSize }} data={data} />);
    assert.equal(getDOMNode(instance.overlay).style.fontSize, fontSize);
  });

  it('Should load data async', () => {
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

    const instance = mount(
      <TreePicker
        data={data}
        virtualized={false}
        inline
        cascade={false}
        defaultExpandAll
        getChildren={() => [
          {
            label: 'children1',
            value: 'children1'
          }
        ]}
      />
    );
    instance.find('div[data-ref="0-1"]  > .rs-tree-node-expand-icon').simulate('click');

    assert.equal(instance.html().indexOf('data-key="0-1-0"') > -1, true);

    instance.unmount();
  });

  it('Should render one node when searchKeyword is `M`', () => {
    const instance = mount(<TreePicker virtualized={false} data={data} inline searchKeyword="M" />);

    assert.equal(instance.find('.rs-tree-node').length, 1);
    instance.unmount();
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<TreePicker data={data} classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('should render tree node with custom dom', () => {
    const customData = [
      {
        value: '1',
        label: <span className="custom-label">1</span>
      }
    ];
    const instance = mount(<TreePicker virtualized={false} data={customData} inline />);
    assert.equal(instance.find('.custom-label').length, 1);
  });

  it('Should call `onOpen` callback', done => {
    const doneOp = () => {
      done();
    };
    const picker = getInstance(<TreePicker onOpen={doneOp} data={data} />);
    picker.open();
  });

  it('Should call `onClose` callback', done => {
    const doneOp = () => {
      done();
    };
    const picker = getInstance(<TreePicker defaultOpen onClose={doneOp} data={data} />);
    picker.close();
  });

  it('should render with expand master node', () => {
    const instance = mount(
      <TreePicker virtualized={false} data={data} inline expandItemValues={['Master']} />
    );
    assert.equal(instance.find(itemExpandedClassName).length, 1);
  });

  it('should fold all the node when toggle master node', () => {
    let expandItemValues = [];
    const mockOnExpand = values => {
      expandItemValues = values;
    };
    const instance = mount(
      <TreePicker
        virtualized={false}
        data={data}
        inline
        expandItemValues={['Master']}
        onExpand={mockOnExpand}
      />
    );

    assert.equal(instance.html().indexOf('rs-tree-node-expanded') > -1, true);

    instance.find('div[data-ref="0-0"]  > .rs-tree-node-expand-icon').simulate('click');

    instance.setProps({
      expandItemValues
    });
    assert.equal(instance.html().indexOf('rs-tree-node-expanded') === -1, true);

    instance.unmount();
  });

  it('Should render the specified menu content by `searchBy`', () => {
    const instance = getInstance(
      <TreePicker
        virtualized={false}
        defaultOpen
        defaultExpandAll
        data={data}
        searchBy={(a, b, c) => c.value === 'Master'}
      />
    );
    const list = getDOMNode(instance.overlay).querySelectorAll('.rs-tree-node');
    assert.equal(list.length, 1);
    assert.ok(list[0].innerText, 'Louisa');
  });
});
