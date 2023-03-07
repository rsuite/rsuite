import React from 'react';
import { getDOMNode, getInstance } from '@test/testUtils';
import sinon from 'sinon';
import DropdownMenu from '../DropdownMenu';
import MultiCascader from '../MultiCascader';
import { fireEvent, render, screen } from '@testing-library/react';

const classPrefix = 'rs-picker-cascader-menu';

const items = [
  {
    value: 'abc',
    label: 'abc'
  },
  {
    value: 'abcd',
    label: 'abcd'
  },
  {
    value: 'abcde',
    label: 'abcde',
    children: [
      {
        value: 'vv-abc',
        label: 'vv-abc'
      },
      {
        value: 'vv-abcd',
        label: 'vv-abcd'
      }
    ]
  }
];

describe('MultiCascader -  DropdownMenu', () => {
  it('Should output a `cascader-menu-items` ', () => {
    const instance = getDOMNode(
      <DropdownMenu
        classPrefix={classPrefix}
        disabledItemValues={[]}
        value={[]}
        childrenKey="children"
        labelKey="label"
        valueKey="value"
        cascadeData={[]}
        uncheckableItemValues={[]}
      />
    );

    assert.ok(instance.className.match(/\bcascader-menu-items\b/));
  });

  it('Should output 3 `menu-item` ', () => {
    render(<MultiCascader open data={items} />);

    expect(screen.getAllByRole('option')).to.have.lengthOf(3);
  });

  it('Should have a menuWidth', () => {
    const instance = getInstance(<MultiCascader defaultOpen data={items} menuWidth={100} />);

    // eslint-disable-next-line testing-library/no-node-access
    const menuContainer = instance.overlay.querySelector('.rs-picker-cascader-menu-column');
    assert.ok(menuContainer.style.width, '100px');
  });

  it('Should output 3 `menu-item` ', () => {
    const data = [
      {
        myValue: 'abc',
        myLabel: 'abc'
      },
      {
        myValue: 'abcd',
        myLabel: 'abcd'
      },
      {
        myLabel: 'vvv',
        items: [
          {
            myValue: 'vv-abc',
            myLabel: 'vv-abc'
          },
          {
            myValue: 'vv-abcd',
            myLabel: 'vv-abcd'
          }
        ]
      }
    ];

    render(
      <MultiCascader
        defaultOpen
        labelKey="myLabel"
        valueKey="myValue"
        childrenKey="items"
        data={data}
      />
    );

    expect(screen.getAllByRole('option')).to.have.lengthOf(3);
  });

  it('Should call onSelect callback with correct node value', () => {
    const onSelect = sinon.spy();

    render(<MultiCascader defaultOpen data={items} onSelect={onSelect} />);

    fireEvent.click(screen.getByRole('option', { name: 'abcd' }).firstChild as HTMLElement);

    expect(onSelect).to.have.been.calledWith({ label: 'abcd', value: 'abcd' });
  });

  it('Should call onSelect callback 2 count', () => {
    const onSelectSpy = sinon.spy();
    render(
      <MultiCascader
        defaultOpen
        data={items}
        disabledItemValues={['abcd']}
        onSelect={onSelectSpy}
      />
    );

    fireEvent.click(screen.getByRole('option', { name: 'abc' }).firstChild as HTMLElement);
    fireEvent.click(screen.getByRole('option', { name: 'abcde' }).firstChild as HTMLElement);

    expect(onSelectSpy).to.have.been.calledTwice;
  });

  it('Should not call onSelect callback on disabled item', () => {
    const onSelectSpy = sinon.spy();
    render(
      <MultiCascader
        defaultOpen
        data={items}
        disabledItemValues={['abcd']}
        onSelect={onSelectSpy}
      />
    );

    fireEvent.click(screen.getByRole('option', { name: 'abcd' }).firstChild as HTMLElement);
    expect(onSelectSpy).not.to.have.been.called;
  });

  it('Should call renderMenuItem callback ', () => {
    render(
      <MultiCascader
        defaultOpen
        data={items}
        renderMenuItem={item => <i data-testid="custom-item">{item}</i>}
      />
    );

    expect(screen.getAllByTestId('custom-item')).to.have.lengthOf(3);
  });

  it('Should be disabled item ', () => {
    render(<MultiCascader defaultOpen data={items} disabledItemValues={['abcd', 'abcde']} />);

    expect(screen.getByRole('option', { name: 'abcd' }).firstChild as HTMLElement).to.have.class(
      'rs-checkbox-disabled'
    );
    expect(screen.getByRole('option', { name: 'abcde' }).firstChild as HTMLElement).to.have.class(
      'rs-checkbox-disabled'
    );
  });

  it('Should be uncheckable item ', () => {
    render(<MultiCascader defaultOpen data={items} uncheckableItemValues={['abcd', 'abcde']} />);

    expect(screen.getAllByRole('checkbox')).to.have.lengthOf(1);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(
      <DropdownMenu
        classPrefix="cascader"
        className="custom"
        disabledItemValues={[]}
        value={[]}
        childrenKey="children"
        labelKey="label"
        valueKey="value"
        cascadeData={[]}
        uncheckableItemValues={[]}
      />
    );
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(
      <DropdownMenu
        classPrefix="cascader"
        style={{ fontSize }}
        disabledItemValues={[]}
        value={[]}
        childrenKey="children"
        labelKey="label"
        valueKey="value"
        cascadeData={[]}
        uncheckableItemValues={[]}
      />
    );
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(
      <DropdownMenu
        classPrefix="custom-prefix"
        disabledItemValues={[]}
        value={[]}
        childrenKey="children"
        labelKey="label"
        valueKey="value"
        cascadeData={[]}
        uncheckableItemValues={[]}
      />
    );
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
