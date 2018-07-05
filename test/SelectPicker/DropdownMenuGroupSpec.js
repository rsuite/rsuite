import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { findDOMNode } from 'react-dom';
import { namespace } from 'rsuite-utils/lib/Picker/constants';

import DropdownMenuGroup from '../../src/SelectPicker/DropdownMenuGroup';
import DropdownMenuItem from '../../src/SelectPicker/DropdownMenuItem';

const classPrefix = `${namespace}-select-menu-group`;
const titleClassName = `.${classPrefix}-title`;

describe('<SelectPicker> - DropdownMenuGroup', () => {
  it('Should output a `menu-item-roup`', () => {
    const Title = 'Title';
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenuGroup title="title">{Title}</DropdownMenuGroup>
    );

    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.className, classPrefix);
    assert.equal(instanceDom.querySelector(`.${classPrefix}-children`).innerText, Title);
  });

  it('Should have a title', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenuGroup title={<div>title</div>} />
    );
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.querySelector(titleClassName).innerText, 'title');
  });

  it('Should have 2 option', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenuGroup title={<div>title</div>}>
        <DropdownMenuItem>1</DropdownMenuItem>
        <DropdownMenuItem>2</DropdownMenuItem>
      </DropdownMenuGroup>
    );
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.querySelectorAll(`.${namespace}-select-menu-item`).length, 2);
  });

  it('Should be closed', () => {
    const instance = ReactTestUtils.renderIntoDocument(<DropdownMenuGroup title="title" />);
    const instanceDom = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDom.querySelector(titleClassName));
    assert.ok(findDOMNode(instance).className.match(/\bclosed\b/));
  });

  it('Should call onClick callback when click title', done => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenuGroup title="title" onClick={doneOp} />
    );
    const instanceDom = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDom.querySelector(titleClassName));
    assert.ok(findDOMNode(instance).className.match(/\bclosed\b/));
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenuGroup className="custom" title="title" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenuGroup style={{ fontSize }} title="title" />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });
});
