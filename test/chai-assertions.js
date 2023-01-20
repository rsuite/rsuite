/**
 * TODO: Add typescript definition for custom assertions
 */
chai.use((chai, { flag }) => {
  /**
   * Check element is visible
   * Useful for testing popups and disclosures
   *
   * Overwrite `visible` from chai-dom with jest-dom implementation
   * Ref: https://github.com/testing-library/jest-dom/blob/main/src/to-be-visible.js
   * @see https://github.com/nathanboktae/chai-dom/issues/51
   *
   * @this {import('chai').AssertionStatic}
   */
  chai.Assertion.overwriteProperty('visible', function () {
    return function () {
      const element = flag(this, 'object');

      const isInDocument = element.ownerDocument === element.getRootNode({ composed: true });
      const isVisible = isInDocument && isElementVisible(element);

      this.assert(
        isVisible,
        `Element is not visible${isInDocument ? '' : ' (element is not in the document)'}`,
        'Element is visible'
      );
    };
  });

  function isStyleVisible(element) {
    const { getComputedStyle } = element.ownerDocument.defaultView;

    const { display, visibility, opacity } = getComputedStyle(element);
    return (
      display !== 'none' &&
      visibility !== 'hidden' &&
      visibility !== 'collapse' &&
      opacity !== '0' &&
      opacity !== 0
    );
  }

  function isAttributeVisible(element, previousElement) {
    return (
      !element.hasAttribute('hidden') &&
      (element.nodeName === 'DETAILS' && previousElement.nodeName !== 'SUMMARY'
        ? element.hasAttribute('open')
        : true)
    );
  }

  function isElementVisible(element, previousElement) {
    return (
      isStyleVisible(element) &&
      isAttributeVisible(element, previousElement) &&
      (!element.parentElement || isElementVisible(element.parentElement, element))
    );
  }
});

chai.use((chaiAPI, utils) => {
  chai.Assertion.addMethod('toHaveError', function toHaveError(expectedMessage) {
    const callback = this._obj;
    let caughtError = null;

    const originalMethod = console.error;

    console.error = actualMessage => {
      caughtError = actualMessage;
    };

    callback();

    console.error = originalMethod;

    if (expectedMessage) {
      this.assert(
        utils.eql(caughtError, expectedMessage),
        'Could not match a call to `console.error`.'
      );
      return;
    }

    this.assert(caughtError !== null, 'Could not match a call to `console.error`.');
  });
});
