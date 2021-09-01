import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode, getInstance, render } from '@test/testUtils';

import TagPicker from '../index';
import Button from '../../Button';

const data = [
  {
    label: 'Eugenia',
    value: 'Eugenia',
    role: 'Master'
  },
  {
    label: <span>Kariane</span>,
    value: 'Kariane',
    role: 'Master'
  },
  {
    label: 'Louisa',
    value: 'Louisa',
    role: 'Master'
  }
];

describe('TagPicker', () => {
  it('Should clean selected default value', () => {
    const instance = getInstance(<TagPicker defaultOpen data={data} defaultValue={['Eugenia']} />);

    ReactTestUtils.Simulate.click(instance.root.querySelector('.rs-picker-toggle-clean'));

    expect(instance.root.querySelector('.rs-picker-toggle-placeholder').innerText).to.equal(
      'Select'
    );
  });

  it('Should not clean selected value', () => {
    const instance = getDOMNode(<TagPicker defaultOpen data={data} value={['Eugenia']} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle-clean'));
    expect(instance.querySelectorAll('.rs-tag').length).to.equal(1);
    expect(instance.querySelector('.rs-tag-text').innerText).to.equal('Eugenia');
  });

  it('Should output a TagPicker', () => {
    const Title = 'Title';
    const instance = getDOMNode(<TagPicker>{Title}</TagPicker>);
    assert.include(instance.className, 'rs-picker-tag');
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<TagPicker disabled data={data} value={['Eugenia']} />);

    assert.ok(instance.className.match(/\bdisabled\b/));
    assert.ok(!instance.querySelector('.rs-tag-icon-close'));
  });

  it('Should output a button', () => {
    const instance = getInstance(<TagPicker toggleAs="button" />);
    assert.ok(instance.root.querySelector('button'));
  });

  it('Should be block', () => {
    const instance = getDOMNode(<TagPicker block />);
    assert.ok(instance.className.match(/\bblock\b/));
  });

  it('Should active item by `value`', () => {
    const value = 'Louisa';
    const instance = getInstance(<TagPicker defaultOpen data={data} value={[value]} />);
    assert.equal(instance.root.querySelector('.rs-tag-text').innerText, value);
    assert.equal(instance.overlay.querySelector('.rs-checkbox-checked').innerText, value);
  });

  it('Should active item by `defaultValue`', () => {
    const value = 'Louisa';
    const instance = getInstance(<TagPicker defaultOpen data={data} defaultValue={[value]} />);

    assert.equal(instance.root.querySelector('.rs-tag-text').innerText, value);
    assert.equal(instance.overlay.querySelector('.rs-checkbox-checked').innerText, value);
    assert.ok(instance.root.querySelector('.rs-tag-icon-close'));
  });

  it('Should render a group', () => {
    const instance = getInstance(<TagPicker defaultOpen groupBy="role" data={data} />);
    assert.ok(instance.overlay.querySelector('.rs-picker-menu-group'));
  });

  it('Should have a placeholder', () => {
    const instance = getDOMNode(<TagPicker className="custom" placeholder="test" />);

    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').innerText, 'test');
  });

  it('Should render a placeholder when value error', () => {
    const instance = getDOMNode(
      <TagPicker
        placeholder="test"
        data={[
          { label: '1', value: '1' },
          { label: '2', value: '2' }
        ]}
        value={['4']}
      />
    );
    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').innerText, 'test');
  });

  it('Allow `label` to be an empty string', () => {
    const instance = getInstance(
      <TagPicker placeholder="test" data={[{ label: '', value: '1' }]} value={['1']} defaultOpen />
    );
    const checkbox = instance.overlay.querySelector('.rs-checkbox-checked');

    assert.equal(checkbox.innerText, '');
  });

  it('Should render value by `renderValue`', () => {
    const instance = getDOMNode(
      <TagPicker
        className="custom"
        placeholder="test"
        data={[{ label: 'foo', value: 'bar' }]}
        value={['bar']}
        renderValue={(value, items) => `${items[0].label}-${items[0].value}`}
      />
    );

    assert.equal(instance.querySelector('.rs-picker-tag-wrapper').innerText, 'foo-bar');
  });

  it('Should output a value by renderValue()', () => {
    const placeholder = 'value';

    // Valid value
    const instance = getDOMNode(
      <TagPicker
        renderValue={v => [v, placeholder]}
        data={[{ value: 1, label: '1' }]}
        value={[1]}
      />
    );

    // Invalid value
    const instance2 = getDOMNode(
      <TagPicker renderValue={v => [v, placeholder]} data={[]} value={[2]} />
    );

    assert.equal(instance.querySelector('.rs-picker-tag-wrapper').innerText, `1${placeholder}`);
    assert.equal(instance2.querySelector('.rs-picker-tag-wrapper').innerText, `2${placeholder}`);
  });

  it('Should render a placeholder when value error', () => {
    const instance = getDOMNode(<TagPicker value={[2]} placeholder={'test'} />);
    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').innerText, 'test');
  });

  it('Should call `onChange` callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getInstance(
      <TagPicker defaultOpen onChange={doneOp} data={[{ label: '1', value: '1' }]} />
    );

    ReactTestUtils.Simulate.change(instance.overlay.querySelector('input'));
  });

  it('Should call `onClean` callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(
      <TagPicker data={data} defaultValue={['Kariane']} onClean={doneOp} />
    );
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle-clean'));
  });

  it('Should call `onSelect` by key=Enter ', done => {
    const doneOp = (value, item) => {
      if (value[1] === 'Louisa' && item.value === 'Louisa') {
        done();
      }
    };
    const instance = getDOMNode(
      <TagPicker defaultOpen data={data} onSelect={doneOp} defaultValue={['Kariane']} />
    );

    ReactTestUtils.Simulate.keyDown(instance, { key: 'ArrowDown' });
    ReactTestUtils.Simulate.keyDown(instance, { key: 'Enter' });
  });

  it('Should output a clean button', () => {
    const instance = getInstance(<TagPicker data={data} defaultValue={['Louisa']} />);
    assert.ok(instance.root.querySelector('.rs-picker-toggle-clean'));
  });

  it('Should call `onSearch` callback', done => {
    const doneOp = key => {
      if (key === 'a') {
        done();
      }
    };
    const instance = getDOMNode(<TagPicker defaultOpen onSearch={doneOp} />);
    const input = instance.querySelector('.rs-picker-search-input input');
    input.value = 'a';

    ReactTestUtils.Simulate.change(input);
  });

  it('Should focus item by key=ArrowDown ', () => {
    const instance = getInstance(<TagPicker defaultOpen data={data} defaultValue={['Eugenia']} />);
    ReactTestUtils.Simulate.keyDown(instance.overlay, { key: 'ArrowDown' });
    assert.equal(instance.overlay.querySelector('.rs-check-item-focus').innerText, 'Kariane');
  });

  it('Should focus item by key=ArrowUp ', () => {
    const instance = getInstance(<TagPicker defaultOpen data={data} defaultValue={['Kariane']} />);
    ReactTestUtils.Simulate.keyDown(instance.overlay, { key: 'ArrowUp' });
    assert.equal(instance.overlay.querySelector('.rs-check-item-focus').innerText, 'Eugenia');
  });

  it('Should call `onChange` by key=Enter ', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(
      <TagPicker defaultOpen data={data} onChange={doneOp} defaultValue={['Kariane']} />
    );

    ReactTestUtils.Simulate.keyDown(instance, { key: 'Enter' });
  });

  it('Should call `onChange` by remove last item ', done => {
    const doneOp = value => {
      if (value.length === 1 && value[0] === 'Kariane') {
        done();
      }
    };
    const instance = getDOMNode(
      <TagPicker defaultOpen data={data} onChange={doneOp} defaultValue={['Kariane', 'Eugenia']} />
    );
    assert.equal(instance.querySelectorAll('.rs-tag').length, 2);
    ReactTestUtils.Simulate.keyDown(instance.querySelector('input'), { key: 'Backspace' });
  });

  it('Should call `onChange` by removeTag ', done => {
    const doneOp = value => {
      if (value.length === 1 && value[0] === 'Eugenia') {
        done();
      }
    };
    const instance = getDOMNode(
      <TagPicker defaultOpen data={data} onChange={doneOp} defaultValue={['Kariane', 'Eugenia']} />
    );
    assert.equal(instance.querySelectorAll('.rs-tag').length, 2);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-tag-icon-close'));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<TagPicker className="custom" defaultOpen />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<TagPicker style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<TagPicker classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should render a button by toggleAs={Button}', () => {
    const instance = getDOMNode(<TagPicker open data={data} toggleAs={Button} />);
    assert.ok(instance.querySelector('.rs-btn'));
  });

  it('Should call `tagProps.onClose` ', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(
      <TagPicker
        defaultOpen
        data={data}
        defaultValue={['Kariane', 'Eugenia']}
        tagProps={{
          onClose: doneOp
        }}
      />
    );
    assert.equal(instance.querySelectorAll('.rs-tag').length, 2);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-tag-icon-close'));
  });

  it('Should not render tag close icon', () => {
    const instance = getDOMNode(
      <TagPicker
        data={data}
        defaultValue={['Kariane']}
        tagProps={{
          closable: false
        }}
      />
    );

    assert.ok(!instance.querySelector('.rs-tag-icon-close'));
  });

  it('Should render a span tag', () => {
    const instance = getDOMNode(
      <TagPicker
        data={data}
        defaultValue={['Kariane']}
        tagProps={{
          as: 'span'
        }}
      />
    );
    assert.equal(instance.querySelector('.rs-tag').tagName, 'SPAN');
  });

  it('Should not be call renderValue()', () => {
    const instance = getDOMNode(<TagPicker renderValue={() => 'value'} />);
    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').innerText, 'Select');
  });

  it('Should call renderValue', () => {
    const instance1 = getDOMNode(<TagPicker value={['Test']} renderValue={() => '1'} />);
    const instance2 = getDOMNode(<TagPicker value={['Test']} renderValue={() => null} />);
    const instance3 = getDOMNode(<TagPicker value={['Test']} renderValue={() => undefined} />);

    assert.equal(instance1.querySelector('.rs-picker-tag-wrapper').innerText, '1');
    assert.equal(instance2.querySelector('.rs-picker-toggle-placeholder').innerText, 'Select');
    assert.equal(instance3.querySelector('.rs-picker-toggle-placeholder').innerText, 'Select');

    assert.include(instance1.className, 'rs-picker-has-value');
    assert.notInclude(instance2.className, 'rs-picker-has-value');
    assert.notInclude(instance3.className, 'rs-picker-has-value');
  });

  it('Children should not be selected', () => {
    const data = [{ value: 1, label: 'A', children: [{ value: 2, label: 'B' }] }];
    const instance = getDOMNode(<TagPicker data={data} value={[2]} />);
    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').innerText, 'Select');
    assert.notInclude(instance.className, 'rs-picker-has-value');
  });

  it('Should set a tabindex for input', () => {
    const instance = getDOMNode(<TagPicker tabIndex={10} />);
    assert.equal(instance.querySelector('input[type="text"]').getAttribute('tabindex'), '10');
  });

  it('Should create a tag', done => {
    const doneOp = value => {
      if (value.length === 1 && value[0] === 'abc') {
        done();
      }
    };

    const inputRef = React.createRef();

    ReactTestUtils.act(() => {
      render(<TagPicker ref={inputRef} data={[]} onCreate={doneOp} creatable />);
    });

    const picker = inputRef.current.root;
    const input = picker.querySelector('.rs-picker-search input');

    ReactTestUtils.Simulate.click(picker);
    input.value = 'abc';
    ReactTestUtils.Simulate.change(input);
    ReactTestUtils.Simulate.keyDown(input, { key: 'Enter' });
  });

  it('Should create a tag by tirgger="Space" ', done => {
    const doneOp = value => {
      if (value.length === 1 && value[0] === 'abc') {
        done();
      }
    };

    const inputRef = React.createRef();

    ReactTestUtils.act(() => {
      render(<TagPicker ref={inputRef} data={[]} onCreate={doneOp} creatable trigger="Space" />);
    });

    const picker = inputRef.current.root;
    const input = picker.querySelector('.rs-picker-search input');

    ReactTestUtils.Simulate.click(picker);
    input.value = 'abc';
    ReactTestUtils.Simulate.change(input);
    ReactTestUtils.Simulate.keyDown(input, { key: ' ' });
  });

  it('Should create a tag by tirgger="Comma" ', done => {
    const doneOp = value => {
      if (value.length === 1 && value[0] === 'abc') {
        done();
      }
    };

    const inputRef = React.createRef();

    ReactTestUtils.act(() => {
      render(<TagPicker ref={inputRef} data={[]} onCreate={doneOp} creatable trigger="Comma" />);
    });

    const picker = inputRef.current.root;
    const input = picker.querySelector('.rs-picker-search input');

    ReactTestUtils.Simulate.click(picker);
    input.value = 'abc';
    ReactTestUtils.Simulate.change(input);
    ReactTestUtils.Simulate.keyDown(input, { key: ',' });
  });

  it('Should be plaintext', () => {
    const instance1 = getInstance(<TagPicker plaintext data={data} value={['Eugenia']} />);
    const instance2 = getInstance(<TagPicker plaintext data={data} />);
    const instance3 = getInstance(<TagPicker plaintext data={data} placeholder="-" />);
    const instance4 = getInstance(
      <TagPicker plaintext data={data} placeholder="-" value={['Eugenia']} />
    );

    assert.equal(instance1.target.innerText, 'Eugenia');
    assert.equal(instance2.target.innerText, 'Not selected');
    assert.equal(instance3.target.innerText, '-');
    assert.equal(instance4.target.innerText, 'Eugenia');
  });
});
