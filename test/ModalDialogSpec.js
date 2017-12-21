import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';


import ModalDialog from '../src/ModalDialog';
import innerText from './innerText';
import { globalKey } from '../src/utils/prefix';

describe('ModalDialog', () => {

  it('Should render a dialog', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <ModalDialog>{title}</ModalDialog>
    );

    assert.equal(findDOMNode(instance).className, `${globalKey}modal`);
    assert.ok(findDOMNode(instance).querySelector(`.${globalKey}modal-dialog`));
    assert.equal(innerText(findDOMNode(instance)), title);
  });

  it('Should have a custom className in dialog', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ModalDialog dialogClassName="custom-dialog" />
    );
    assert.ok(findDOMNode(instance).querySelector(`.${globalKey}modal-dialog.custom-dialog`));
  });

  it('Should have a custom style in dialog', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <ModalDialog dialogStyle={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).querySelector(`.${globalKey}modal-dialog`).style.fontSize, fontSize);
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
