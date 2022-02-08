import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import SidenavToggle from '../SidenavToggle';

describe('SidenavToggle', () => {
  testStandardProps(<SidenavToggle />);

  it('Should render a toggle', () => {
    const instance = getDOMNode(<SidenavToggle />);
    assert.include(instance.className, 'rs-sidenav-toggle');
  });

  it('Should call onToggle callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<SidenavToggle onToggle={doneOp} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-btn-icon'));
  });
});
