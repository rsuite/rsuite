import React from 'react';
import { render, screen } from '@testing-library/react';
import Modal from '../Modal';
import Drawer from '../../Drawer';

describe('Modal in Drawer', () => {
  it('Should set maxHeight style for Body component when overflow is true', () => {
    render(
      <Drawer open size="full">
        <Modal open overflow>
          <Modal.Body data-testid="body">
            <div style={{ height: 5000 }}>message</div>
          </Modal.Body>
        </Modal>
      </Drawer>
    );

    expect(screen.getByTestId('body').style.maxHeight).to.be.not.empty;
  });

  it('Should not set maxHeight style for Body component when overflow is false', () => {
    render(
      <Drawer open size="full">
        <Modal open overflow={false}>
          <Modal.Body data-testid="body">
            <div style={{ height: 5000 }}>message</div>
          </Modal.Body>
        </Modal>
      </Drawer>
    );

    expect(screen.getByTestId('body').style.maxHeight).to.be.empty;
  });
});
