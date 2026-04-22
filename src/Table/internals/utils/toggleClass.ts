import addClass from 'dom-lib/addClass';
import removeClass from 'dom-lib/removeClass';

const toggleClass = (node: HTMLElement, className: string, condition: boolean) => {
  if (condition) {
    addClass(node, className);
  } else {
    removeClass(node, className);
  }
};

export default (node: HTMLElement | HTMLElement[], className: string, condition: boolean) => {
  if (!node) {
    return;
  }

  if (
    Array.isArray(node) ||
    Object.prototype.hasOwnProperty.call(Object.getPrototypeOf(node), 'length')
  ) {
    node = node as HTMLElement[];
    Array.from(node).forEach(item => {
      toggleClass(item, className, condition);
    });
    return;
  }
  toggleClass(node, className, condition);
};
