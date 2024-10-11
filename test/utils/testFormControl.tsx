import React from 'react';
import { render, screen } from '@testing-library/react';
import { format } from 'date-fns';
import Form from '../../src/Form';
import FormControl from '../../src/FormControl';

interface TestFormControlOptions {
  /**
   * The value when the component is controlled.
   */
  value?: any;

  /**
   * The value type.
   */
  valueType?: 'time' | 'data-time' | 'string' | 'number';

  /**
   * The component props.
   */
  componentProps?: Record<string, any>;

  /**
   * Get the rendered root element.
   */
  getRootElement?: (view: any) => HTMLElement;

  /**
   * Get the rendered UI element.
   */
  getUIElement?: () => any;
}

function expectedRenderedValue(value: any, datetimeFormat = 'yyyy-MM-dd') {
  if (Array.isArray(value) && value[0] instanceof Date) {
    return value.map(item => format(item, datetimeFormat)).join(' ~ ');
  } else if (value instanceof Date) {
    return format(value, datetimeFormat);
  } else if (typeof value !== 'string') {
    return value.toString();
  }

  return value;
}

export function testFormControl(
  TestComponent: React.ComponentType<any>,
  options?: TestFormControlOptions
) {
  const {
    value = 'default value',
    valueType,
    componentProps,
    getUIElement = () => screen.getByRole('textbox'),
    getRootElement = view => view.container.firstChild as HTMLElement
  } = options || {};
  const displayName = TestComponent.displayName;

  const datetimeFormat = valueType === 'time' ? 'HH:mm' : 'yyyy-MM-dd';

  describe(`${displayName} - Status of FormControl`, () => {
    it('Should be disabled', () => {
      render(<TestComponent disabled value={value} {...componentProps} />);

      const element = getUIElement();

      if (element.tagName === 'INPUT') {
        expect(element).to.have.attribute('disabled');
      } else {
        expect(element).to.have.attribute('aria-disabled', 'true');
      }
    });

    it('Should be read only', () => {
      const view = render(<TestComponent readOnly value={value} {...componentProps} />);

      const element = getUIElement();

      if (element.tagName === 'INPUT') {
        expect(getUIElement()).to.have.attribute('readonly');
      } else {
        expect(getRootElement(view)).to.have.class(new RegExp('-read-only'));
      }
    });

    it('Should be plaintext', () => {
      render(<TestComponent plaintext value={value} {...componentProps} />);

      expect(screen.queryByRole('text')).to.exist;

      if (typeof value === 'string' || typeof value === 'number') {
        expect(screen.getByRole('text')).to.have.text(value.toString());
      } else if (value instanceof Date) {
        expect(screen.getByRole('text')).to.have.text(format(value, datetimeFormat));
      }
    });

    it('Should render a default plain text', () => {
      render(<TestComponent plaintext {...componentProps} />);

      const plaintext = ['Unfilled', 'Not selected', 'Not uploaded', datetimeFormat];

      expect(screen.getByRole('text').textContent).to.match(new RegExp(plaintext.join('|')));
    });
  });

  describe(`${displayName} - In Form`, () => {
    it('Should assign values to components by accepting the values of the Form', () => {
      const values = {
        name: value
      };
      render(
        <Form formValue={values}>
          <FormControl name="name" accepter={TestComponent} {...componentProps} />
        </Form>
      );

      const element = getUIElement();
      const pickerInput = screen.queryByTestId('picker-toggle-input');

      const renderedValue = expectedRenderedValue(value, datetimeFormat);

      if (element.tagName === 'INPUT') {
        expect(element).to.have.value(renderedValue);
      } else if (pickerInput) {
        expect(screen.getByTestId('picker-toggle-input')).to.have.attribute('value', renderedValue);
      } else {
        expect(element).to.have.text(renderedValue);
      }
    });

    it('Should be disabled', () => {
      render(
        <Form disabled>
          <FormControl name="name" accepter={TestComponent} {...componentProps} />
        </Form>
      );

      const element = getUIElement();

      if (element.tagName === 'INPUT') {
        expect(element).to.have.attribute('disabled');
      } else {
        expect(element).to.have.attribute('aria-disabled', 'true');
      }
    });

    it('Should be read only', () => {
      render(
        <Form readOnly>
          <FormControl name="name" accepter={TestComponent} {...componentProps} />
        </Form>
      );

      const element = getUIElement();

      if (element.tagName === 'INPUT') {
        expect(getUIElement()).to.have.attribute('readonly');
      } else {
        expect(screen.getByTestId('form-control-wrapper').firstChild).to.have.class(
          new RegExp('-read-only')
        );
      }
    });

    it('Should be plaintext', () => {
      render(
        <Form plaintext formValue={{ name: value }}>
          <FormControl name="name" accepter={TestComponent} {...componentProps} />
        </Form>
      );

      expect(screen.queryByRole('text')).to.exist;

      if (typeof value === 'string' || typeof value === 'number') {
        expect(screen.getByRole('text')).to.have.text(value.toString());
      } else if (value instanceof Date) {
        expect(screen.getByRole('text')).to.have.text(format(value, datetimeFormat));
      }
    });

    it('Should render a default plain text', () => {
      render(
        <Form plaintext>
          <FormControl name="name" accepter={TestComponent} {...componentProps} />
        </Form>
      );

      const plaintext = ['Unfilled', 'Not selected', 'Not uploaded', datetimeFormat];

      expect(screen.getByRole('text').textContent).to.match(new RegExp(plaintext.join('|')));
    });
  });
}
