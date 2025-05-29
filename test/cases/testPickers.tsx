import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';

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

      expect(container.firstChild).to.have.attr('data-block', 'true');
    });

    if (popupAutoWidth) {
      it('Should set minimum width for popup', () => {
        render(<TestComponent data={data} open popupAutoWidth style={{ width: 100 }} />);

        expect(screen.getByTestId('picker-popup')).to.have.attr(
          'style',
          '--rs-picker-min-width: 100px;'
        );
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
        expect(screen.queryByTestId('picker-popup')).not.to.exist;
      });

      it('Should not open menu on Enter key when loading=true', () => {
        render(<TestComponent data={data} loading />);

        const combobox = screen.getByRole(role);

        fireEvent.keyDown(combobox, { key: 'Enter' });

        expect(screen.queryByTestId('picker-popup')).not.to.exist;
      });
    });

    describe('ref testing', () => {
      it('Should call `onOpen` callback', async () => {
        const onOpen = vi.fn();
        const ref = React.createRef<any>();

        render(<TestComponent onOpen={onOpen} data={data} ref={ref} />);

        act(() => ref.current.open());

        await waitFor(() => {
          expect(onOpen).toHaveBeenCalledTimes(1);
        });
      });

      it('Should call `onClose` callback', async () => {
        const onClose = vi.fn();
        const ref = React.createRef<any>();

        render(<TestComponent onClose={onClose} data={data} ref={ref} />);

        act(() => ref.current.open());
        act(() => ref.current.close());

        await waitFor(() => {
          expect(onClose).toHaveBeenCalledTimes(1);
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
        const onOpen = vi.fn();

        render(<TestComponent data={data} onOpen={onOpen} />);

        const combobox = screen.getByRole(role);

        fireEvent.click(combobox);
        expect(screen.getByTestId('picker-popup')).to.exist;

        expect(onOpen).toHaveBeenCalled();
      });

      it('Should open the popup on Enter key', () => {
        const onOpen = vi.fn();

        render(<TestComponent data={data} onOpen={onOpen} />);

        const combobox = screen.getByRole(role);

        fireEvent.keyDown(combobox, { key: 'Enter' });
        expect(screen.getByTestId('picker-popup')).to.exist;

        expect(onOpen).toHaveBeenCalledTimes(1);
      });

      it('Should call onClose when clicking outside', async () => {
        const onClose = vi.fn();

        render(<TestComponent data={data} defaultOpen onClose={onClose} />);

        fireEvent.mouseDown(document.body);

        expect(onClose).toHaveBeenCalledTimes(1);
      });

      it('Should call onClose when pressing Escape key', () => {
        const onClose = vi.fn();

        render(<TestComponent data={data} defaultOpen onClose={onClose} />);

        // Verify popup is open
        expect(screen.getByTestId('picker-popup')).to.exist;

        // Press Escape
        fireEvent.keyDown(screen.getByRole(role), { key: 'Escape' });

        // Verify onClose was called
        expect(onClose).toHaveBeenCalled();
      });

      it('Should close the popup on Tab key', () => {
        const onClose = vi.fn();

        render(<TestComponent data={data} defaultOpen onClose={onClose} />);

        const combobox = screen.getByRole(role);

        fireEvent.keyDown(combobox, { key: 'Tab' });
        expect(screen.getByTestId('picker-popup')).to.exist;

        expect(onClose).toHaveBeenCalledTimes(1);
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
        expect(screen.getByTestId('picker-popup')).to.exist;
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

      const paddings = ['10px 13px', '8px 11px', '5px 9px', '2px 7px'];

      screen.getAllByRole(role).forEach((picker, index) => {
        if (role === 'combobox') {
          expect(picker).to.have.style('padding', paddings[index]);
        }

        // height: 42, 36, 30, 24
        const height = maxHeight - index * heightStep;
        const pickerType = (picker.parentNode as HTMLElement)?.dataset?.picker;

        // TODO: fix tag picker height
        if (pickerType !== 'tag') {
          expect(picker).to.have.style('height', `${height}px`);
        }
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

        const paddings = ['10px 14px', '8px 12px', '5px 10px', '2px 8px'];

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
