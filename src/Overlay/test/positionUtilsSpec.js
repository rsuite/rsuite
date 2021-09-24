import positionUtils from '../positionUtils';

let container;
let target;
const targetWidth = 10;
const targetHeight = 10;
const targetLeft = 20;
const targetTop = 20;
beforeEach(() => {
  container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.width = '200px';
  container.style.height = '200px';
  container.style.left = '0';
  container.style.top = '0';
  document.body.appendChild(container);

  target = document.createElement('div');
  target.style.position = 'absolute';
  target.style.width = `${targetWidth}px`;
  target.style.height = `${targetHeight}px`;
  target.style.left = `${targetLeft}px`;
  target.style.top = `${targetTop}px`;

  container.appendChild(target);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
  target = null;
});

function createElementToContainer(width, height) {
  const element = document.createElement('div');
  element.style.position = 'absolute';
  element.style.width = `${width}px`;
  element.style.height = `${height}px`;

  if (container) {
    container.appendChild(element);
  }

  return element;
}

describe('Overlay - positionUtils', () => {
  it('Should get the position of the element relative to the container', () => {
    const utils = positionUtils({ placement: 'left' });
    const positon = utils.getPosition(target, container);

    assert.deepEqual(positon, {
      top: targetTop,
      left: targetLeft,
      width: targetWidth,
      height: targetHeight
    });
  });

  it('Should not overflow the container', () => {
    const utils = positionUtils({ placement: 'left', preventOverflow: true });
    const overlayWidth = 40;
    const overlayHeight = 40;
    const overlay = createElementToContainer(overlayWidth, overlayHeight);
    const positon = utils.calcOverlayPosition(overlay, target, container);

    assert.equal(positon.positionLeft, 0);
    assert.equal(positon.positionClassName, 'placement-left');
  });

  it('Should get relative position to `left` of `target`', () => {
    const utils = positionUtils({ placement: 'left' });
    const overlayWidth = 20;
    const overlayHeight = 20;
    const overlay = createElementToContainer(overlayWidth, overlayHeight);
    const positon = utils.calcOverlayPosition(overlay, target, container);

    assert.equal(positon.positionLeft, targetLeft - overlayWidth);
    assert.equal(positon.positionTop, targetTop - targetHeight / 2);
    assert.equal(positon.positionClassName, 'placement-left');
  });

  it('Should get relative position to `leftStart` of `target`', () => {
    const utils = positionUtils({ placement: 'leftStart' });
    const overlayWidth = 20;
    const overlayHeight = 20;
    const overlay = createElementToContainer(overlayWidth, overlayHeight);
    const positon = utils.calcOverlayPosition(overlay, target, container);

    assert.equal(positon.positionLeft, targetLeft - overlayWidth);
    assert.equal(positon.positionTop, targetTop);
    assert.equal(positon.positionClassName, 'placement-left-start');
  });

  it('Should get relative position to `leftEnd` of `target`', () => {
    const utils = positionUtils({ placement: 'leftEnd' });
    const overlayWidth = 20;
    const overlayHeight = 20;
    const overlay = createElementToContainer(overlayWidth, overlayHeight);
    const positon = utils.calcOverlayPosition(overlay, target, container);

    assert.equal(positon.positionLeft, targetLeft - overlayWidth);
    assert.equal(positon.positionTop, targetTop - targetHeight);
    assert.equal(positon.positionClassName, 'placement-left-end');
  });

  it('Should get relative position to `right` of `target`', () => {
    const utils = positionUtils({ placement: 'right' });
    const overlayWidth = 20;
    const overlayHeight = 20;
    const overlay = createElementToContainer(overlayWidth, overlayHeight);
    const positon = utils.calcOverlayPosition(overlay, target, container);

    assert.equal(positon.positionLeft, targetLeft + targetWidth);
    assert.equal(positon.positionTop, targetTop - targetHeight / 2);
    assert.equal(positon.positionClassName, 'placement-right');
  });

  it('Should get relative position to `rightStart` of `target`', () => {
    const utils = positionUtils({ placement: 'rightStart' });
    const overlayWidth = 20;
    const overlayHeight = 20;
    const overlay = createElementToContainer(overlayWidth, overlayHeight);
    const positon = utils.calcOverlayPosition(overlay, target, container);

    assert.equal(positon.positionLeft, targetLeft + targetWidth);
    assert.equal(positon.positionTop, targetTop);
    assert.equal(positon.positionClassName, 'placement-right-start');
  });

  it('Should get relative position to `rightEnd` of `target`', () => {
    const utils = positionUtils({ placement: 'rightEnd' });
    const overlayWidth = 20;
    const overlayHeight = 20;
    const overlay = createElementToContainer(overlayWidth, overlayHeight);
    const positon = utils.calcOverlayPosition(overlay, target, container);

    assert.equal(positon.positionLeft, targetLeft + targetWidth);
    assert.equal(positon.positionTop, targetTop - targetHeight);
    assert.equal(positon.positionClassName, 'placement-right-end');
  });

  it('Should get relative position to `top` of `target`', () => {
    const utils = positionUtils({ placement: 'top' });
    const overlayWidth = 20;
    const overlayHeight = 20;
    const overlay = createElementToContainer(overlayWidth, overlayHeight);
    const positon = utils.calcOverlayPosition(overlay, target, container);

    assert.equal(positon.positionLeft, targetLeft - targetWidth / 2);
    assert.equal(positon.positionTop, targetTop - overlayHeight);
    assert.equal(positon.positionClassName, 'placement-top');
  });

  it('Should get relative position to `topStart` of `target`', () => {
    const utils = positionUtils({ placement: 'topStart' });
    const overlayWidth = 20;
    const overlayHeight = 20;
    const overlay = createElementToContainer(overlayWidth, overlayHeight);
    const positon = utils.calcOverlayPosition(overlay, target, container);

    assert.equal(positon.positionLeft, targetLeft);
    assert.equal(positon.positionTop, targetTop - overlayHeight);
    assert.equal(positon.positionClassName, 'placement-top-start');
  });

  it('Should get relative position to `topEnd` of `target`', () => {
    const utils = positionUtils({ placement: 'topEnd' });
    const overlayWidth = 20;
    const overlayHeight = 20;
    const overlay = createElementToContainer(overlayWidth, overlayHeight);
    const positon = utils.calcOverlayPosition(overlay, target, container);

    assert.equal(positon.positionLeft, targetLeft - targetWidth);
    assert.equal(positon.positionTop, targetTop - overlayHeight);
    assert.equal(positon.positionClassName, 'placement-top-end');
  });

  it('Should get relative position to `bottom` of `target`', () => {
    const utils = positionUtils({ placement: 'bottom' });
    const overlayWidth = 20;
    const overlayHeight = 20;
    const overlay = createElementToContainer(overlayWidth, overlayHeight);
    const positon = utils.calcOverlayPosition(overlay, target, container);

    assert.equal(positon.positionLeft, targetLeft - targetWidth / 2);
    assert.equal(positon.positionTop, targetTop + targetHeight);
    assert.equal(positon.positionClassName, 'placement-bottom');
  });

  it('Should get relative position to `bottomStart` of `target`', () => {
    const utils = positionUtils({ placement: 'bottomStart' });
    const overlayWidth = 20;
    const overlayHeight = 20;
    const overlay = createElementToContainer(overlayWidth, overlayHeight);
    const positon = utils.calcOverlayPosition(overlay, target, container);

    assert.equal(positon.positionLeft, targetLeft);
    assert.equal(positon.positionTop, targetTop + targetHeight);
    assert.equal(positon.positionClassName, 'placement-bottom-start');
  });

  it('Should get relative position to `bottomEnd` of `target`', () => {
    const utils = positionUtils({ placement: 'bottomEnd' });
    const overlayWidth = 20;
    const overlayHeight = 20;
    const overlay = createElementToContainer(overlayWidth, overlayHeight);
    const positon = utils.calcOverlayPosition(overlay, target, container);

    assert.equal(positon.positionLeft, targetLeft - targetWidth);
    assert.equal(positon.positionTop, targetTop + targetHeight);
    assert.equal(positon.positionClassName, 'placement-bottom-end');
  });

  it('Should get relative position to `auto` of `target`', () => {
    const utils = positionUtils({ placement: 'auto' });
    const overlayWidth = 20;
    const overlayHeight = 20;
    const overlay = createElementToContainer(overlayWidth, overlayHeight);
    const positon = utils.calcOverlayPosition(overlay, target, container);

    assert.equal(positon.positionLeft, targetLeft);
    assert.equal(positon.positionTop, targetTop + targetHeight);
    assert.equal(positon.positionClassName, 'placement-bottom-start');
  });

  it('Should get relative position to `auto` of `target` in body', () => {
    const utils = positionUtils({ placement: 'auto' });
    const overlayWidth = 20;
    const overlayHeight = 20;
    const overlay = createElementToContainer(overlayWidth, overlayHeight);
    const positon = utils.calcOverlayPosition(overlay, target, document.body);

    assert.equal(positon.positionLeft, targetLeft + targetWidth);
    assert.equal(positon.positionTop, targetTop);
    assert.equal(positon.positionClassName, 'placement-right-start');
  });

  it('Should get relative position to `autoVertical` of `target`', () => {
    const utils = positionUtils({ placement: 'autoVertical' });
    const overlayWidth = 20;
    const overlayHeight = 20;
    const overlay = createElementToContainer(overlayWidth, overlayHeight);
    const positon = utils.calcOverlayPosition(overlay, target, container);

    assert.equal(positon.positionLeft, targetLeft - targetWidth / 2);
    assert.equal(positon.positionTop, targetTop + targetHeight);
    assert.equal(positon.positionClassName, 'placement-bottom');
  });

  it('Should get relative position to `autoHorizontal` of `target`', () => {
    const utils = positionUtils({ placement: 'autoHorizontal' });
    const overlayWidth = 20;
    const overlayHeight = 20;
    const overlay = createElementToContainer(overlayWidth, overlayHeight);
    const positon = utils.calcOverlayPosition(overlay, target, container);

    assert.equal(positon.positionLeft, targetLeft + targetWidth);
    assert.equal(positon.positionTop, targetTop - targetHeight / 2);
    assert.equal(positon.positionClassName, 'placement-right');
  });
});
