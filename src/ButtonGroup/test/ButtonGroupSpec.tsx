import React from 'react';
import { render, screen } from '@testing-library/react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import ButtonGroup from '../ButtonGroup';
import Button from '../../Button';

describe('ButtonGroup', () => {
  testStandardProps(<ButtonGroup />);

  it('Should output a button group', () => {
    const instance = getDOMNode(<ButtonGroup />);
    assert.equal(instance.nodeName, 'DIV');
    assert.ok(instance.className.match(/\bbtn-group\b/));
  });

  context('Sizes', () => {
    it('Should add size', () => {
      const instance = getDOMNode(<ButtonGroup size="lg" />);
      assert.ok(instance.className.match(/\bbtn-group-lg\b/));
    });

    (['lg', 'md', 'sm', 'xs'] as const).forEach(size => {
      it(`Should apply ${size} size on child <Button>s`, () => {
        render(
          <ButtonGroup size={size}>
            <Button data-testid="button">Button</Button>
          </ButtonGroup>
        );

        expect(screen.getByTestId('button')).to.have.class(`rs-btn-${size}`);
      });
    });
  });

  it('Should add vertical variation', () => {
    const instance = getDOMNode(<ButtonGroup vertical />);
    assert.ok(instance.className.match(/\bbtn-group-vertical\b/));
  });

  it('Should add block variation', () => {
    const instance = getDOMNode(<ButtonGroup vertical block />);
    assert.ok(instance.className.match(/\bbtn-group-block\b/));
  });

  it('Should warn about block without vertical', () => {
    getDOMNode(<ButtonGroup block />);
  });

  it('Should add justified variation', () => {
    const instance = getDOMNode(<ButtonGroup justified />);
    assert.ok(instance.className.match(/\bbtn-group-justified\b/));
  });

  it('Should render 2 <button>', () => {
    render(
      <ButtonGroup>
        <Button>Title</Button>
        <Button>Title</Button>
      </ButtonGroup>
    );

    expect(screen.getAllByRole('button')).to.have.lengthOf(2);
  });
});
