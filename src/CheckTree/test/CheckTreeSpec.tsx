/* eslint-disable testing-library/no-node-access */
import React from 'react';
import sinon from 'sinon';
import { render, screen } from '@testing-library/react';
import CheckTree from '../index';
import userEvent from '@testing-library/user-event';
import { mockTreeData } from '@test/mocks/data-mock';
import { testStandardProps } from '@test/utils';

const data = mockTreeData([['Master', 'tester0', ['tester1', 'tester2']], 'disabled']);

describe('CheckTree', () => {
  testStandardProps(<CheckTree data={data} />);

  it('Should render a multi-selectable tree', () => {
    const { container } = render(<CheckTree data={data} />);

    expect(container.firstChild).to.have.class('rs-check-tree');
    expect(screen.getByRole('tree')).to.have.attr('aria-multiselectable', 'true');
  });

  it('Should show indent line', () => {
    render(<CheckTree data={data} showIndentLine />);

    const lines = screen.getByRole('tree').querySelectorAll('.rs-check-tree-indent-line');

    expect(lines).to.have.length(2);
    expect(lines[0]).to.have.style('left', '44px');
    expect(lines[1]).to.have.style('left', '28px');
  });

  it('Should call `onSelectItem` callback with the selected item and the full path', () => {
    const onSelectItem = sinon.spy();

    render(
      <CheckTree data={data} expandItemValues={['Master', 'tester1']} onSelectItem={onSelectItem} />
    );

    // TODO-Doma
    // Handle click on `treeitem`
    userEvent.click(
      screen.getByRole('treeitem', { name: 'tester2' }).querySelector('label') as HTMLLabelElement
    );

    expect(onSelectItem).to.have.been.calledWith(sinon.match({ value: 'tester2' }), [
      sinon.match({ value: 'Master' }),
      sinon.match({ value: 'tester1' }),
      sinon.match({ value: 'tester2' })
    ]);
  });
});
