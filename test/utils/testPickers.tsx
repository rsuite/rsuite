import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import sinon from 'sinon';

interface TestPickerOptions {
  data?: any;
  virtualized?: boolean;
  role?: 'combobox' | 'textbox';
  ariaHaspopup?: 'listbox' | 'dialog' | 'grid' | 'menu' | 'tree';
  popupAutoWidth?: boolean;
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
    ariaHaspopup = 'listbox',
    popupAutoWidth
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
      render(<TestComponent open menuStyle={{ fontSize: 12 }} data={data} />);

      expect(screen.getByTestId('picker-popup')).to.have.style('font-size', '12px');
    });

    it('Should have a custom menuClassName', () => {
      render(<TestComponent open menuClassName="custom-class" data={data} />);

      expect(screen.getByTestId('picker-popup')).to.have.class('custom-class');
    });

    if (popupAutoWidth) {
      it('[DEPRECATED]:Should set minimum width for popup', () => {
        render(<TestComponent data={data} open menuAutoWidth style={{ width: 100 }} />);

        expect(screen.getByTestId('picker-popup').style.minWidth).to.equal('100px');
      });

      it('[DEPRECATED]:Should set minimum width for popup', () => {
        render(<TestComponent data={data} open popupAutoWidth style={{ width: 100 }} />);

        expect(screen.getByTestId('picker-popup').style.minWidth).to.equal('100px');
      });
    }

    if (ariaHaspopup === 'tree') {
      it('Should have a custom popupStyle', () => {
        render(<TestComponent open popupStyle={{ fontSize: 12 }} data={data} />);

        expect(screen.getByTestId('picker-popup')).to.have.style('font-size', '12px');
      });

      it('Should have a custom popupClassName', () => {
        render(<TestComponent open popupClassName="custom-class" data={data} />);

        expect(screen.getByTestId('picker-popup')).to.have.class('custom-class');
      });
    }

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
        const onOpen = sinon.spy();
        const ref = React.createRef<any>();

        render(<TestComponent onOpen={onOpen} data={data} ref={ref} />);

        act(() => ref.current.open());
        await waitFor(() => {
          expect(onOpen).to.have.been.calledOnce;
        });
      });

      it('Should call `onClose` callback', async () => {
        const onCloseSpy = sinon.spy();
        const ref = React.createRef<any>();

        render(<TestComponent onClose={onCloseSpy} data={data} ref={ref} />);

        act(() => ref.current.open());
        act(() => ref.current.close());

        await waitFor(() => {
          expect(onCloseSpy).to.have.been.calledOnce;
        });
      });

      it('Should provide public objects and methods', () => {
        const ref = React.createRef<any>();
        render(<TestComponent data={data} open virtualized={virtualized} ref={ref} />);

        expect(ref.current.root).to.exist;
        expect(ref.current.target).to.exist;
        expect(ref.current.updatePosition).to.instanceOf(Function);
        expect(ref.current.open).to.instanceOf(Function);
        expect(ref.current.close).to.instanceOf(Function);
        expect(ref.current.overlay).to.exist;

        if (virtualized) {
          expect(ref.current.list).to.exist;
        }
      });
    });

    describe('Open state', () => {
      it('Should open the popup on click', () => {
        const onOpen = sinon.spy();

        render(<TestComponent data={data} onOpen={onOpen} />);

        const combobox = screen.getByRole(role);

        fireEvent.click(combobox);
        expect(screen.getByRole(ariaHaspopup)).to.exist;

        expect(onOpen).to.have.been.called;
      });

      it('Should open the popup on Enter key', () => {
        const onOpen = sinon.spy();

        render(<TestComponent data={data} onOpen={onOpen} />);

        const combobox = screen.getByRole(role);

        fireEvent.keyDown(combobox, { key: 'Enter' });
        expect(screen.getByRole(ariaHaspopup)).to.exist;

        expect(onOpen).to.have.been.calledOnce;
      });

      it('Should close the popup on outside click', () => {
        const onClose = sinon.spy();

        render(<TestComponent data={data} defaultOpen onClose={onClose} />);

        fireEvent.mouseDown(document.body);

        expect(onClose).to.have.been.calledOnce;
      });

      it('Should close the popup on Escape key', () => {
        const onClose = sinon.spy();

        render(<TestComponent data={data} defaultOpen onClose={onClose} />);

        const combobox = screen.getByRole(role);

        fireEvent.keyDown(combobox, { key: 'Escape' });
        expect(screen.getByRole(ariaHaspopup)).to.exist;

        expect(onClose).to.have.been.calledOnce;
      });

      it('Should close the popup on Tab key', () => {
        const onClose = sinon.spy();

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

interface TestPickerSizeOptions {
  role?: 'combobox' | 'textbox';
  maxHeight?: number;
  heightStep?: number;
  subtle?: boolean;
  [key: string]: any;
}

export function testPickerSize(
  TestComponent: React.ComponentType<any>,
  pickerProps: TestPickerSizeOptions = {}
) {
  const displayName = TestComponent.displayName;
  const {
    role = 'combobox',
    maxHeight = 42,
    heightStep = 6,
    subtle = true,
    ...restProps
  } = pickerProps;

  describe(`${displayName} - Size`, () => {
    it('Should have different sizes', () => {
      render(
        <>
          <TestComponent size="lg" placeholder="Large" {...restProps} />
          <TestComponent size="md" placeholder="Medium" {...restProps} />
          <TestComponent size="sm" placeholder="Small" {...restProps} />
          <TestComponent size="xs" placeholder="Xsmall" {...restProps} />
        </>
      );

      const paddings = [
        '9px 36px 9px 15px',
        '7px 32px 7px 11px',
        '4px 30px 4px 9px',
        '1px 28px 1px 7px'
      ];

      screen.getAllByRole(role).forEach((picker, index) => {
        if (role === 'combobox') {
          expect(picker).to.have.style('padding', paddings[index]);
        }

        expect(picker).to.have.style('height', `${maxHeight - index * heightStep}px`);
      });
    });

    if (subtle) {
      it('Should have different sizes with subtle appearance', () => {
        render(
          <>
            <TestComponent size="lg" appearance="subtle" placeholder="Large" {...restProps} />
            <TestComponent size="md" appearance="subtle" placeholder="Medium" {...restProps} />
            <TestComponent size="sm" appearance="subtle" placeholder="Small" {...restProps} />
            <TestComponent size="xs" appearance="subtle" placeholder="Xsmall" {...restProps} />
          </>
        );

        const paddings = [
          '10px 36px 10px 16px',
          '8px 32px 8px 12px',
          '5px 30px 5px 10px',
          '2px 28px 2px 8px'
        ];

        screen.getAllByRole(role).forEach((picker, index) => {
          if (role === 'combobox') {
            expect(picker).to.have.style('padding', paddings[index]);
          }
          expect(picker).to.have.style('height', `${maxHeight - index * heightStep}px`);
        });
      });
    }
  });
}
