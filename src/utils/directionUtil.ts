/**
 * gets computed document direction
 */
export default () =>
  typeof window !== 'undefined' && window.getComputedStyle(document.body).direction === 'rtl';
