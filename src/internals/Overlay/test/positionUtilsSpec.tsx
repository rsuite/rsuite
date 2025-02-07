import positionUtils from '../positionUtils';

/**
 * @type {HTMLDivElement}
 */
let container;
/**
 * @type {HTMLDivElement}
 */
let target;
const targetWidth = 10;
const targetHeight = 10;
const targetLeft = 20;
const targetTop = 20;
const targetMarginTop = 20;
const targetMarginLeft = 20;

const targetPositionTop = targetTop + targetMarginTop;
const targetPositionLeft = targetLeft + targetMarginLeft;

const cursorPositionTop = 30;
const cursorPositionLeft = 30;
const cursorPositionWidth = 10;
const cursorPositionHeight = 10;

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
  target.style.marginLeft = `${targetMarginLeft}px`;
  target.style.marginTop = `${targetMarginTop}px`;

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
    const utils = positionUtils({ placement: 'left', preventOverflow: false, padding: 0 });
    const position = utils.getPosition(target, container);

    expect(position).to.deep.equal({
      top: targetPositionTop,
      left: targetPositionLeft,
      width: targetWidth,
      height: targetHeight
    });
  });

  it('Should not overflow the container', () => {
    const utils = positionUtils({ placement: 'left', preventOverflow: true, padding: 0 });
    const overlayWidth = 40;
    const overlayHeight = 40;
    const overlay = createElementToContainer(overlayWidth, overlayHeight);
    const position = utils.calcOverlayPosition(overlay, target, container);

    expect(position.positionLeft).to.equal(0);
    expect(position.positionClassName).to.equal('placement-left');
  });

  it('Should get relative position to `left` of `target`', () => {
    const utils = positionUtils({ placement: 'left', preventOverflow: false, padding: 0 });
    const overlayWidth = 20;
    const overlayHeight = 20;
    const overlay = createElementToContainer(overlayWidth, overlayHeight);
    const position = utils.calcOverlayPosition(overlay, target, container);

    expect(position.positionLeft).to.equal(targetPositionLeft - overlayWidth);
    expect(position.positionTop).to.equal(targetPositionTop - targetHeight / 2);
    expect(position.positionClassName).to.equal('placement-left');
  });

  it('Should get relative position to `leftStart` of `target`', () => {
    const utils = positionUtils({ placement: 'leftStart', preventOverflow: false, padding: 0 });
    const overlayWidth = 20;
    const overlayHeight = 20;
    const overlay = createElementToContainer(overlayWidth, overlayHeight);
    const position = utils.calcOverlayPosition(overlay, target, container);

    expect(position.positionLeft).to.equal(targetPositionLeft - overlayWidth);
    expect(position.positionTop).to.equal(targetPositionTop);
    expect(position.positionClassName).to.equal('placement-left-start');
  });

  it('Should get relative position to `leftEnd` of `target`', () => {
    const utils = positionUtils({ placement: 'leftEnd', preventOverflow: false, padding: 0 });
    const overlayWidth = 20;
    const overlayHeight = 20;
    const overlay = createElementToContainer(overlayWidth, overlayHeight);
    const position = utils.calcOverlayPosition(overlay, target, container);

    expect(position.positionLeft).to.equal(targetPositionLeft - overlayWidth);
    expect(position.positionTop).to.equal(targetPositionTop - targetHeight);
    expect(position.positionClassName).to.equal('placement-left-end');
  });

  it('Should get relative position to `right` of `target`', () => {
    const utils = positionUtils({ placement: 'right', preventOverflow: false, padding: 0 });
    const overlayWidth = 20;
    const overlayHeight = 20;
    const overlay = createElementToContainer(overlayWidth, overlayHeight);
    const position = utils.calcOverlayPosition(overlay, target, container);

    expect(position.positionLeft).to.equal(targetPositionLeft + targetWidth);
    expect(position.positionTop).to.equal(targetPositionTop - targetHeight / 2);
    expect(position.positionClassName).to.equal('placement-right');
  });

  it('Should get relative position to `rightStart` of `target`', () => {
    const utils = positionUtils({ placement: 'rightStart', preventOverflow: false, padding: 0 });
    const overlayWidth = 20;
    const overlayHeight = 20;
    const overlay = createElementToContainer(overlayWidth, overlayHeight);
    const position = utils.calcOverlayPosition(overlay, target, container);

    expect(position.positionLeft).to.equal(targetPositionLeft + targetWidth);
    expect(position.positionTop).to.equal(targetPositionTop);
    expect(position.positionClassName).to.equal('placement-right-start');
  });

  it('Should get relative position to `rightEnd` of `target`', () => {
    const utils = positionUtils({ placement: 'rightEnd', preventOverflow: false, padding: 0 });
    const overlayWidth = 20;
    const overlayHeight = 20;
    const overlay = createElementToContainer(overlayWidth, overlayHeight);
    const position = utils.calcOverlayPosition(overlay, target, container);

    expect(position.positionLeft).to.equal(targetPositionLeft + targetWidth);
    expect(position.positionTop).to.equal(targetPositionTop - targetHeight);
    expect(position.positionClassName).to.equal('placement-right-end');
  });

  it('Should get relative position to `top` of `target`', () => {
    const utils = positionUtils({ placement: 'top', preventOverflow: false, padding: 0 });
    const overlayWidth = 20;
    const overlayHeight = 20;
    const overlay = createElementToContainer(overlayWidth, overlayHeight);
    const position = utils.calcOverlayPosition(overlay, target, container);

    expect(position.positionLeft).to.equal(targetPositionLeft - targetWidth / 2);
    expect(position.positionTop).to.equal(targetPositionTop - overlayHeight);
    expect(position.positionClassName).to.equal('placement-top');
  });

  it('Should get relative position to `topStart` of `target`', () => {
    const utils = positionUtils({ placement: 'topStart', preventOverflow: false, padding: 0 });
    const overlayWidth = 20;
    const overlayHeight = 20;
    const overlay = createElementToContainer(overlayWidth, overlayHeight);
    const position = utils.calcOverlayPosition(overlay, target, container);

    expect(position.positionLeft).to.equal(targetPositionLeft);
    expect(position.positionTop).to.equal(targetPositionTop - overlayHeight);
    expect(position.positionClassName).to.equal('placement-top-start');
  });

  it('Should get relative position to `topEnd` of `target`', () => {
    const utils = positionUtils({ placement: 'topEnd', preventOverflow: false, padding: 0 });
    const overlayWidth = 20;
    const overlayHeight = 20;
    const overlay = createElementToContainer(overlayWidth, overlayHeight);
    const position = utils.calcOverlayPosition(overlay, target, container);

    expect(position.positionLeft).to.equal(targetPositionLeft - targetWidth);
    expect(position.positionTop).to.equal(targetPositionTop - overlayHeight);
    expect(position.positionClassName).to.equal('placement-top-end');
  });

  it('Should get relative position to `bottom` of `target`', () => {
    const utils = positionUtils({ placement: 'bottom', preventOverflow: false, padding: 0 });
    const overlayWidth = 20;
    const overlayHeight = 20;
    const overlay = createElementToContainer(overlayWidth, overlayHeight);
    const position = utils.calcOverlayPosition(overlay, target, container);

    expect(position.positionLeft).to.equal(targetPositionLeft - targetWidth / 2);
    expect(position.positionTop).to.equal(targetPositionTop + targetHeight);
    expect(position.positionClassName).to.equal('placement-bottom');
  });

  it('Should get relative position to `bottomStart` of `target`', () => {
    const utils = positionUtils({ placement: 'bottomStart', preventOverflow: false, padding: 0 });
    const overlayWidth = 20;
    const overlayHeight = 20;
    const overlay = createElementToContainer(overlayWidth, overlayHeight);
    const position = utils.calcOverlayPosition(overlay, target, container);

    expect(position.positionLeft).to.equal(targetPositionLeft);
    expect(position.positionTop).to.equal(targetPositionTop + targetHeight);
    expect(position.positionClassName).to.equal('placement-bottom-start');
  });

  it('Should get relative position to `bottomEnd` of `target`', () => {
    const utils = positionUtils({ placement: 'bottomEnd', preventOverflow: false, padding: 0 });
    const overlayWidth = 20;
    const overlayHeight = 20;
    const overlay = createElementToContainer(overlayWidth, overlayHeight);
    const position = utils.calcOverlayPosition(overlay, target, container);

    expect(position.positionLeft).to.equal(targetPositionLeft - targetWidth);
    expect(position.positionTop).to.equal(targetPositionTop + targetHeight);
    expect(position.positionClassName).to.equal('placement-bottom-end');
  });

  it('Should get relative position to `auto` of `target`', () => {
    const utils = positionUtils({ placement: 'auto', preventOverflow: false, padding: 0 });
    const overlayWidth = 20;
    const overlayHeight = 20;
    const overlay = createElementToContainer(overlayWidth, overlayHeight);
    const position = utils.calcOverlayPosition(overlay, target, container);

    expect(position.positionLeft).to.equal(targetPositionLeft);
    expect(position.positionTop).to.equal(targetPositionTop + targetHeight);
    expect(position.positionClassName).to.equal('placement-bottom-start');
  });

  it('Should get relative position to `auto` of `target` in body', () => {
    const utils = positionUtils({ placement: 'auto', preventOverflow: false, padding: 0 });
    const overlayWidth = 20;
    const overlayHeight = 20;
    const overlay = createElementToContainer(overlayWidth, overlayHeight);
    const position = utils.calcOverlayPosition(overlay, target, document.body);

    expect(position.positionLeft).to.equal(targetPositionLeft + targetWidth);
    expect(position.positionTop).to.equal(targetPositionTop);
    expect(position.positionClassName).to.equal('placement-right-start');
  });

  it('Should get relative position to `autoVertical` of `target`', () => {
    const utils = positionUtils({ placement: 'autoVertical', preventOverflow: false, padding: 0 });
    const overlayWidth = 20;
    const overlayHeight = 20;
    const overlay = createElementToContainer(overlayWidth, overlayHeight);
    const position = utils.calcOverlayPosition(overlay, target, container);

    expect(position.positionLeft).to.equal(targetPositionLeft - targetWidth / 2);
    expect(position.positionTop).to.equal(targetPositionTop + targetHeight);
    expect(position.positionClassName).to.equal('placement-bottom');
  });

  it('Should get relative position to `autoHorizontal` of `target`', () => {
    const utils = positionUtils({
      placement: 'autoHorizontal',
      preventOverflow: false,
      padding: 0
    });
    const overlayWidth = 20;
    const overlayHeight = 20;
    const overlay = createElementToContainer(overlayWidth, overlayHeight);
    const position = utils.calcOverlayPosition(overlay, target, container);

    expect(position.positionLeft).to.equal(targetPositionLeft + targetWidth);
    expect(position.positionTop).to.equal(targetPositionTop - targetHeight / 2);
    expect(position.positionClassName).to.equal('placement-right');
  });

  it('Should get relative position to `left` of `cursorPosition`', () => {
    const utils = positionUtils({ placement: 'left', preventOverflow: false, padding: 0 });
    const overlayWidth = 20;
    const overlayHeight = 20;
    const overlay = createElementToContainer(overlayWidth, overlayHeight);
    const cursorPosition = {
      top: cursorPositionTop,
      left: cursorPositionLeft,
      width: cursorPositionWidth,
      height: cursorPositionHeight
    };
    const position = utils.calcOverlayPosition(overlay, target, container, cursorPosition as any);

    expect(position.positionLeft).to.equal(cursorPositionLeft - overlayWidth);
    expect(position.positionTop).to.equal(cursorPositionTop - targetHeight / 2);
    expect(position.positionClassName).to.equal('placement-left');
  });
});
