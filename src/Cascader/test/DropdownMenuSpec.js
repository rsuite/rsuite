import React from 'react';
import { fireEvent, act } from '@testing-library/react';
import { getDOMNode, getInstance } from '@test/testUtils';
import DropdownMenu from '../DropdownMenu';
import Dropdown from '../Cascader';

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

describe('Cascader -  DropdownMenu', () => {
  it('Should output a `cascader-menu-items` ', () => {
    const instance = getDOMNode(<DropdownMenu classPrefix="rs-picker-cascader-menu" />);

    expect(instance.className).to.contain('cascader-menu-items');
  });

  it('Should output 3 `menu-item` ', () => {
    const instance = getInstance(<Dropdown defaultOpen data={items} />);

    expect(instance.overlay.querySelectorAll('li')).to.length(3);
  });

  it('Should have a menuWidth', () => {
    const instance = getInstance(<Dropdown defaultOpen data={items} menuWidth={100} />);

    const menuContainer = instance.overlay.querySelector('.rs-picker-cascader-menu-column');

    expect(menuContainer.style.width).to.equal('100px');
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

    const instance = getInstance(
      <Dropdown defaultOpen labelKey="myLabel" valueKey="myValue" childrenKey="items" data={data} />
    );

    expect(instance.overlay.querySelectorAll('li')).to.length(3);
  });

  it('Should call onSelect callback node value', done => {
    const doneOp = node => {
      try {
        assert.equal(node.value, 'abcd');
        done();
      } catch (err) {
        done(err);
      }
    };

    const instance = getInstance(<Dropdown defaultOpen data={items} onSelect={doneOp} />);

    fireEvent.click(instance.overlay.querySelectorAll('.rs-picker-cascader-menu-item')[1]);
  });

  it('Should call onSelect callback 2 count', () => {
    const onSelectSpy = sinon.spy();
    const instance = getInstance(
      <Dropdown defaultOpen data={items} disabledItemValues={['abcd']} onSelect={onSelectSpy} />
    );

    act(() => {
      fireEvent.click(instance.overlay.querySelectorAll('.rs-picker-cascader-menu-item')[0]);
    });
    act(() => {
      fireEvent.click(instance.overlay.querySelectorAll('.rs-picker-cascader-menu-item')[2]);
    });

    expect(onSelectSpy).to.callCount(2);
  });

  it('Should not call onSelect callback on disabled item', () => {
    const onSelectSpy = sinon.spy();
    const instance = getInstance(
      <Dropdown defaultOpen data={items} disabledItemValues={['abcd']} onSelect={onSelectSpy} />
    );

    act(() => {
      fireEvent.click(instance.overlay.querySelectorAll('.rs-picker-cascader-menu-item')[1]);
    });

    expect(onSelectSpy).to.not.called;
  });

  it('Should call renderMenuItem callback ', () => {
    const instance = getInstance(
      <Dropdown defaultOpen data={items} renderMenuItem={item => <i>{item}</i>} />
    );

    expect(instance.overlay.querySelectorAll(`${'.rs-picker-cascader-menu-item'} i`)).to.length(3);
  });

  it('Should be disabled item ', () => {
    const instance = getInstance(
      <Dropdown defaultOpen data={items} disabledItemValues={['abcd', 'abcde']} />
    );

    expect(
      instance.overlay.querySelectorAll('.rs-picker-cascader-menu-item')[1].className
    ).to.contain('disabled');

    expect(
      instance.overlay.querySelectorAll('.rs-picker-cascader-menu-item')[2].className
    ).to.contain('disabled');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<DropdownMenu classPrefix="cascader" className="custom" />);
    expect(instance.className).to.contain('custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<DropdownMenu classPrefix="cascader" style={{ fontSize }} />);

    expect(instance.style.fontSize).to.equal(fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<DropdownMenu classPrefix="custom-prefix" />);
    expect(instance.className).to.contain('custom-prefix');
  });
});
