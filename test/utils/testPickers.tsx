import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Sinon from 'sinon';
import { getInstance } from './getInstance';

interface TestPickerOptions {
  data?: any;
  virtualized?: boolean;
  role?: 'combobox' | 'textbox';
  ariaHaspopup?: 'listbox' | 'dialog' | 'grid' | 'menu' | 'tree';
}

const defaultData = [
  { label: 'User 1', value: 'user1' },
  { label: 'User 2', value: 'user2' }
];

export function testPickers(TestComponent: React.ComponentType<any>, options?: TestPickerOptions) {
  const {
    data = defaultData,
    virtualized,
    role = 'combobox',
    ariaHaspopup = 'listbox'
  } = options || {};
  const displayName = TestComponent.displayName;

  describe(`${displayName} - Common props for all pickers`, () => {
    it('Should render a picker', () => {
      const { container } = render(<TestComponent data={data} />);

      expect(container.firstChild).to.have.class('rs-picker');
    });

    if (role === 'combobox') {
      it('Should have a subtle appearance', () => {
        render(<TestComponent data={data} appearance="subtle" />);

        expect(screen.getByRole(role)).to.have.class('rs-btn-subtle');
      });
    }

    it('Should be block', () => {
      const { container } = render(<TestComponent data={data} block />);

      expect(container.firstChild).to.have.class('rs-picker-block');
    });

    it('Should have a custom menuStyle', () => {
      const instance = getInstance(<TestComponent open menuStyle={{ fontSize: 12 }} data={data} />);

      expect(instance.overlay).to.have.style('font-size', '12px');
    });

    it('Should have a custom menuClassName', () => {
      const instance = getInstance(<TestComponent open menuClassName="custom-class" data={data} />);

      expect(instance.overlay).to.have.class('custom-class');
    });

    describe('Loading state', () => {
      it('Should display a spinner when loading=true', () => {
        render(<TestComponent data={data} loading />);

        expect(screen.getByTestId('spinner')).to.exist;
      });

      it('Should display label and spinner when label is specified', () => {
        render(<TestComponent label="User" data={data} loading />);

        expect(screen.getByTestId('picker-label')).to.have.text('User');
        expect(screen.getByTestId('spinner')).to.exist;
      });

      it('Should not open menu on click when loading=true', () => {
        render(<TestComponent data={data} loading />);

        const combobox = screen.getByRole(role);

        fireEvent.click(combobox);
        expect(screen.queryByRole(ariaHaspopup)).not.to.exist;
      });

      it('Should not open menu on Enter key when loading=true', () => {
        render(<TestComponent data={data} loading />);

        const combobox = screen.getByRole(role);

        fireEvent.keyDown(combobox, { key: 'Enter' });
        expect(screen.queryByRole(ariaHaspopup)).not.to.exist;
      });
    });

    describe('ref testing', () => {
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

    describe('Open state', () => {
      it('Should open the popup on click', () => {
        const onOpen = Sinon.spy();

        render(<TestComponent data={data} onOpen={onOpen} />);

        const combobox = screen.getByRole(role);

        fireEvent.click(combobox);
        expect(screen.getByRole(ariaHaspopup)).to.exist;

        expect(onOpen).to.have.been.calledOnce;
      });

      it('Should open the popup on Enter key', () => {
        const onOpen = Sinon.spy();

        render(<TestComponent data={data} onOpen={onOpen} />);

        const combobox = screen.getByRole(role);

        fireEvent.keyDown(combobox, { key: 'Enter' });
        expect(screen.getByRole(ariaHaspopup)).to.exist;

        expect(onOpen).to.have.been.calledOnce;
      });

      it('Should close the popup on outside click', () => {
        const onClose = Sinon.spy();

        render(<TestComponent data={data} defaultOpen onClose={onClose} />);

        fireEvent.mouseDown(document.body);

        expect(onClose).to.have.been.calledOnce;
      });

      it('Should close the popup on Escape key', () => {
        const onClose = Sinon.spy();

        render(<TestComponent data={data} defaultOpen onClose={onClose} />);

        const combobox = screen.getByRole(role);

        fireEvent.keyDown(combobox, { key: 'Escape' });
        expect(screen.getByRole(ariaHaspopup)).to.exist;

        expect(onClose).to.have.been.calledOnce;
      });

      it('Should close the popup on Tab key', () => {
        const onClose = Sinon.spy();

        render(<TestComponent data={data} defaultOpen onClose={onClose} />);

        const combobox = screen.getByRole(role);

        fireEvent.keyDown(combobox, { key: 'Tab' });
        expect(screen.getByRole(ariaHaspopup)).to.exist;

        expect(onClose).to.have.been.calledOnce;
      });

      it('Should be controlled by `open`', () => {
        const App = () => {
          const [open, setOpen] = React.useState(false);
          return (
            <TestComponent
              data={data}
              open={open}
              onOpen={() => {
                setOpen(true);
              }}
              onClose={() => {
                setOpen(false);
              }}
            />
          );
        };

        render(<App />);

        const combobox = screen.getByRole(role);

        fireEvent.click(combobox);
        expect(screen.getByRole(ariaHaspopup)).to.exist;
      });
    });
  });
}
