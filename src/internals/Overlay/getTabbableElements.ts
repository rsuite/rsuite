const selector = [
  'a[href]',
  'area[href]',
  'input',
  'select',
  'textarea',
  'button',
  'iframe',
  'object',
  'embed',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]',
  '[tabindex]',
  'details > summary:first-of-type'
].join(',');

/** Read dialog focus targets, including tabindex and radio groups. */
function getTabbableElements(
  container: HTMLElement,
  backwards: boolean,
  activeElement: Element | null = container.ownerDocument.activeElement
) {
  const elements = Array.from(container.querySelectorAll<HTMLElement>(selector));
  const getTabIndex = (element: HTMLElement) => {
    if (
      !element.hasAttribute('tabindex') &&
      ((element.isContentEditable && !element.parentElement?.isContentEditable) ||
        element.matches('audio[controls],video[controls]'))
    ) {
      return 0;
    }
    return element.tabIndex;
  };
  const isTabbable = (element: HTMLElement) =>
    getTabIndex(element) >= 0 &&
    !element.closest('[inert]') &&
    !element.matches(':disabled') &&
    element.getClientRects().length > 0 &&
    getComputedStyle(element).visibility === 'visible';
  const candidates = elements.filter(
    element => !element.hasAttribute('data-rsuite-modal-focus-guard') && isTabbable(element)
  );
  const radios = Array.from(
    (container.getRootNode() as Document | ShadowRoot).querySelectorAll<HTMLInputElement>(
      'input[type="radio"]'
    )
  );

  return candidates
    .filter(element => {
      if (!(element instanceof HTMLInputElement) || element.type !== 'radio' || !element.name) {
        return true;
      }
      const group = radios.filter(
        candidate =>
          candidate.name === element.name &&
          candidate.form === element.form &&
          isTabbable(candidate)
      );
      const current = group.find(candidate => candidate === activeElement);
      const checked = group.find(candidate => candidate.checked);
      const eligible = group.filter(candidate => candidates.includes(candidate));
      return (
        element ===
        (current || checked || (backwards ? eligible[eligible.length - 1] : eligible[0]))
      );
    })
    .sort((a, b) => {
      const aIndex = getTabIndex(a) || Infinity;
      const bIndex = getTabIndex(b) || Infinity;
      return aIndex === bIndex ? 0 : aIndex - bIndex;
    });
}

export default getTabbableElements;
