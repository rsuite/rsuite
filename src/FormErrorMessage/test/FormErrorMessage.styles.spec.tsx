import React from 'react';
import FormErrorMessage from '../index';
import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { toRGB, itChrome } from '@test/utils';

import '../styles/index.less';

describe('FormErrorMessage styles', () => {
  itChrome('Should render the correct styles', () => {
    render(
      <div className="rs-form-control-wrapper">
        <FormErrorMessage show data-testid="error">
          Text
        </FormErrorMessage>
      </div>
    );
    const error = screen.getByTestId('error').firstChild as HTMLElement;

    expect(error).to.have.style('color', toRGB('#f44336'));
    expect(error).to.have.style('background-color', toRGB('#fff'));
    expect(error).to.have.style('border', `1px solid ${toRGB('#e5e5ea')}`);
  });
});
