import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Sinon from 'sinon';
import { getInstance } from './getInstance';

interface TestPickerOptions {
  data?: any;
  virtualized?: boolean;
}

const defaultData = [
  { label: 'User 1', value: 'user1' },
  { label: 'User 2', value: 'user2' }
];

export function testPickers(TestComponent: React.ComponentType<any>, options?: TestPickerOptions) {
  const { data = defaultData, virtualized } = options || {};
  const displayName = TestComponent.displayName;

  describe(`${displayName} - Loading state`, () => {
    it('Should display a spinner when loading=true', () => {
      render(<TestComponent data={data} loading />);

      expect(screen.getByTestId('spinner')).to.exist;
    });

    it('Should display label and spinner when label is specified', () => {
      render(<TestComponent label="User" data={data} loading />);

      expect(screen.getByRole('combobox')).to.have.text('User');
      expect(screen.getByTestId('spinner')).to.exist;
    });

    it('Should not open menu on click when loading=true', () => {
      render(<TestComponent data={data} loading />);

      fireEvent.click(screen.getByRole('combobox'));

      expect(screen.queryByRole('listbox')).not.to.exist;
    });

    it('Should not open menu on Enter key when loading=true', () => {
      render(<TestComponent data={data} loading />);

      fireEvent.keyDown(screen.getByRole('combobox'), {
        key: 'Enter'
      });

      expect(screen.queryByRole('listbox')).not.to.exist;
    });
  });

  describe(`${displayName} - ref testing`, () => {
    it('Should call `onOpen` callback', async () => {
      const onOpenSpy = Sinon.spy();
      const instance = getInstance(<TestComponent onOpen={onOpenSpy} data={data} />);

      act(() => instance.open());
      await waitFor(() => {
        expect(onOpenSpy).to.have.been.calledOnce;
      });
    });

    it('Should call `onClose` callback', async () => {
      const onCloseSpy = Sinon.spy();
      const instance = getInstance(<TestComponent onClose={onCloseSpy} data={data} />);

      act(() => instance.open());
      act(() => instance.close());

      await waitFor(() => {
        expect(onCloseSpy).to.have.been.calledOnce;
      });
    });

    it('Should provide public objects and methods', () => {
      const instance = getInstance(<TestComponent data={data} open virtualized={virtualized} />);

      expect(instance.root).to.exist;
      expect(instance.target).to.exist;
      expect(instance.updatePosition).to.instanceOf(Function);
      expect(instance.open).to.instanceOf(Function);
      expect(instance.close).to.instanceOf(Function);
      expect(instance.overlay).to.exist;

      if (virtualized) {
        expect(instance.list).to.exist;
      }
    });
  });
}
