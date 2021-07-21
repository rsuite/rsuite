import { useEffect } from 'react';

export default function useElementResize(eventTarget, listener) {
  useEffect(() => {
    const sandbox = sinon.createSandbox();

    const element = typeof eventTarget === 'function' ? eventTarget() : eventTarget;

    const treeWalker = document.createTreeWalker(element);

    let currentNode = treeWalker.currentNode;
    while (currentNode) {
      if (currentNode instanceof HTMLElement) {
        const style = currentNode.style;
        sandbox.stub(currentNode, 'style').value({
          get width() {
            return style.width;
          },
          set width(val) {
            style.width = val;
            listener();
          },
          get height() {
            return style.height;
          },
          set height(val) {
            console.debug('setting height', val);
            style.height = val;
            listener();
          }
        });
      }
      currentNode = treeWalker.nextNode();
    }

    return () => {
      sandbox.restore();
    };
  }, [eventTarget, listener]);
}
