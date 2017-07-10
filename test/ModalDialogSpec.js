import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';


import ModalDialog from '../src/ModalDialog';

describe('ModalDialog', () => {

  it('Should render a dialog', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <ModalDialog>{title}</ModalDialog>
    );

    assert.equal(findDOMNode(instance).className, 'modal');
    assert.ok(findDOMNode(instance).querySelector('.modal-dialog'));
    assert.equal(findDOMNode(instance).innerText, title);
  });

  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ModalDialog dialogClassName="custom-dialog" />
    );
    assert.ok(findDOMNode(instance).querySelector('.modal-dialog.custom-dialog'));
  });

  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ModalDialog className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });


  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <ModalDialog style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
