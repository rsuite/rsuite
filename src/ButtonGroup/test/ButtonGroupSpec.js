import React from 'react';
import { render } from '@testing-library/react';
import { getDOMNode } from '@test/testUtils';
import ButtonGroup from '../ButtonGroup';
import Button from '../../Button';

describe('ButtonGroup', () => {
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

    ['lg', 'md', 'sm', 'xs'].forEach(size => {
      it(`Should apply ${size} size on child <Button>s`, () => {
        const { getByTestId } = render(
          <ButtonGroup size={size}>
            <Button data-testid="button">Button</Button>
          </ButtonGroup>
        );

        expect(getByTestId('button')).to.have.class(`rs-btn-${size}`);
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

  it('Should have a custom className', () => {
    const instance = getDOMNode(<ButtonGroup className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should render 2 <button>', () => {
    const instance = getDOMNode(
      <ButtonGroup>
        <Button>Title</Button>
        <Button>Title</Button>
      </ButtonGroup>
    );
    assert.equal(instance.querySelectorAll('button').length, 2);
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<ButtonGroup style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<ButtonGroup classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
