import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import { getDOMNode, getInstance, getStyle } from '@test/testUtils';
import Icon from '../Icon';

describe('Icon', () => {
  it('Should output a i', () => {
    const instance = getDOMNode(<Icon icon="star" />);
    assert.equal(instance.nodeName, 'I');
  });

  it('Should output a span', () => {
    const instance = getDOMNode(<Icon icon="star" componentClass="span" />);
    assert.equal(instance.nodeName, 'SPAN');
  });

  it('Should output svg icon', () => {
    const svgIcon = {
      id: 'icon-guide',
      viewBox: '0 0 1024 1024',
      content:
        '<symbol class="icon" viewBox="0 0 1024 1024" id="icon-guide"><defs><style type="text/css"></style></defs><path d="M1021.234 123.08c-0.012-5.808-10.144-16.76-16.924-16.76H552.202V27.244C552.202 12.2 540.006 0 524.956 0h-28.68c-15.048 0-27.246 12.198-27.246 27.246V106.32H163.254C150.96 106.32 0 219.25 0 252.28c0 40.02 150.96 148.836 163.254 148.836h305.776v119.342l-25.416 0.834-316.196 10.372c-5.168 0.168-12.888 10.986-12.77 15.416 0.546 20.372 116.598 72.452 117.448 98.382 0.702 21.432-111.642 93.22-110.948 113.064 0.156 4.486 8.018 5.324 13.254 5.154l316.196-10.372 18.43-0.604V1024H552.2V749.974l231.752-7.604c9.496-0.312 123.464-93.524 122.626-119.034-1.012-30.904-120.114-113.292-129.61-112.98L552.2 517.728v-116.614h452.108c6.692 0 16.732-10.866 16.764-16.6 0.16-26.374-147.734-98.66-147.734-132.236 0-27.748 147.952-103.504 147.896-129.196z m-199.906 503.36c0.646 17.414-70.234 59.27-77.552 59.482l-184.672 5.424-73.158 2.148-209.804 6.16c-4.032 0.12-4.402 0.49-4.516-2.576-0.244-6.618 51.152-40.46 50.61-55.09-0.656-17.702-58.254-47.816-57.7-54.52 0.25-3.018 1.58-1.87 5.56-1.984l215.85-6.356 73.156-2.154 177.942-5.24c7.316-0.212 83.504 33.608 84.284 54.708zM557.28 338.514H216.672c-9.14 0-110.006-53.85-110.006-82.72 0-23.826 98.032-82.34 107.172-82.34H807.62c5.038 0 35.046-2.342 35.046 1.848 0 9.06-94.376 59.628-94.376 79.646 0 24.224 91.292 72.696 90.292 81.836-0.454 4.116-25.99 1.73-30.964 1.73H557.28z" p-id="1435" /></symbol>',
      node: {}
    };
    const instance = getInstance(<Icon icon={svgIcon} componentClass="span" />);

    ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'svg');
  });

  it('Should have a class prefix rsuite-icon', () => {
    const instance = getDOMNode(<Icon icon="star" classPrefix="rsuite-icon" />);
    assert.include(instance.className, 'rsuite-icon-star');
  });

  it('Should have icon class', () => {
    const instance = getDOMNode(<Icon icon="star" />);
    assert.include(instance.className, 'rs-icon-star');
  });

  it('Should have fw class', () => {
    const instance = getDOMNode(<Icon icon="star" fixedWidth />);
    assert.include(instance.className, 'rs-icon-fw');
  });

  it('Should have pulse class', () => {
    const instance = getDOMNode(<Icon icon="star" pulse />);
    assert.include(instance.className, 'rs-icon-pulse');
  });

  it('Should have transform rotate style', () => {
    const instance = getDOMNode(<Icon icon="star" rotate={50} style={{ fontSize: 20 }} />);

    assert.include(getStyle(instance).transform, 'rotate(50deg)');
    assert.include(getStyle(instance).fontSize, '20px');
  });

  it('Should have 2x class', () => {
    const instance = getDOMNode(<Icon icon="star" size="2x" />);
    assert.include(instance.className, 'rs-icon-size-2x');
  });

  it('Should have vertical class', () => {
    const instance = getDOMNode(<Icon icon="star" flip="vertical" />);
    assert.include(instance.className, 'rs-icon-flip-vertical');
  });

  it('Should have stack-2x class', () => {
    const instance = getDOMNode(<Icon icon="star" stack="2x" />);
    assert.include(instance.className, 'rs-icon-stack-2x');
  });

  it('Should have spin class', () => {
    const instance = getDOMNode(<Icon icon="star" spin />);
    assert.include(instance.className, 'rs-icon-spin');
  });

  it('Should have pulse class', () => {
    const instance = getDOMNode(<Icon icon="star" pulse />);
    assert.include(instance.className, 'rs-icon-pulse');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Icon icon="star" className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Icon icon="star" style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Icon icon="star" classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
