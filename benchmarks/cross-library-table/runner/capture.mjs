import { snapshot } from './snapshot.mjs';
import { treeSnapshot } from './tree-snapshot.mjs';
import { virtualSnapshot } from './virtual-snapshot.mjs';
export function createCapture(page, workflow) {
  const extra =
    workflow === 'tree' ? treeSnapshot : workflow === 'virtual' ? virtualSnapshot : null;
  const expression =
    '(() => ({...(' +
    snapshot.toString() +
    ')()' +
    (extra ? ',...(' + extra.toString() + ')()' : '') +
    '}))()';
  return () => page.evaluate(expression);
}
