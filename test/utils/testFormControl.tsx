import React from 'react';
import { render, screen } from '@testing-library/react';
import Sinon from 'sinon';
import { format } from 'date-fns';

interface TestFormControlOptions {
  /**
   * The value when the component is controlled.
   */
  value?: any;

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

export function testFormControl(
  TestComponent: React.ComponentType<any>,
  options?: TestFormControlOptions
) {
  const {
    value = 'default value',
    componentProps,
    getUIElement = () => screen.getByRole('textbox'),
    getRootElement = view => view.container.firstChild as HTMLElement
  } = options || {};
  const displayName = TestComponent.displayName;

  describe(`${displayName} - Status of FormControl`, () => {
    it('Should be disabled', () => {
      const onChange = Sinon.spy();
      render(<TestComponent disabled onChange={onChange} value={value} {...componentProps} />);

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
        expect(screen.getByRole('text')).to.have.text(format(value, 'yyyy-MM-dd'));
      }
    });

    it('Should render a default plain text', () => {
      render(<TestComponent plaintext {...componentProps} />);

      const plaintext = ['Unfilled', 'Not selected', 'Not uploaded', 'yyyy-MM-dd'];

      expect(screen.getByRole('text').textContent).to.match(new RegExp(plaintext.join('|')));
    });
  });
}
