import { snapshot } from './snapshot.mjs';
import { treeSnapshot } from './tree-snapshot.mjs';
import { virtualSnapshot } from './virtual-snapshot.mjs';
import { lifecycleSnapshot } from './lifecycle-snapshot.mjs';
export function createCapture(page, workflow) {
  const extra = { tree: treeSnapshot, virtual: virtualSnapshot, lifecycle: lifecycleSnapshot }[
    workflow
  ];
  const expression =
    '(() => ({...(' +
    snapshot.toString() +
    ')()' +
    (extra ? ',...(' + extra.toString() + ')()' : '') +
    '}))()';
  return () => page.evaluate(expression);
}
