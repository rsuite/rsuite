import sinon from 'sinon';
import { walkTreeDfs, walkTreeBfs } from '../utils/flattenTree';

describe('[utils] Tree utils', () => {
  describe('walkTreeBfs', () => {
    it('Should traverse tree nodes with breadth-first strategy', () => {
      /**
       * Bindary tree
       *    0
       *  1   2
       * 3 4 5 6
       */
      function getChildren(node: number) {
        if (node >= 3) return undefined;
        return [node * 2 + 1, node * 2 + 2];
      }

      const callback = sinon.spy();
      walkTreeBfs([0], getChildren, callback);

      expect(callback.callCount).to.equal(7);
      expect(callback.getCalls().map(call => call.firstArg)).to.eql([0, 1, 2, 3, 4, 5, 6]);
    });
  });
  describe('walkTreeDfs', () => {
    it('Should traverse tree nodes with depth-first strategy', () => {
      /**
       * Bindary tree
       *    0
       *  1   2
       * 3 4 5 6
       */
      function getChildren(node: number) {
        if (node >= 3) return undefined;
        return [node * 2 + 1, node * 2 + 2];
      }

      const callback = sinon.spy();
      walkTreeDfs([0], getChildren, callback);

      expect(callback.callCount).to.equal(7);
      expect(callback.getCalls().map(call => call.firstArg)).to.eql([0, 1, 3, 4, 2, 5, 6]);
    });
  });
});
