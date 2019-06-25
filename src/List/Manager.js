// @flow
import _ from 'lodash';
import type { Position } from './List';

type Collection = string | number;
type Refs = {
  [collection: Collection]: Array<ManagerRef>
};
export type ManagerRef = {
  node: React.Node,
  edgeOffset: Position | null,
  info: {
    collection: Collection,
    index: number,
    disabled?: boolean,
    manager: Manager
  }
};

/*
* Move manager
* */
class Manager {
  refs: Refs = {};
  active: ManagerRef | null;

  add(collection: Collection, ref: ManagerRef) {
    if (!this.refs[collection]) {
      this.refs[collection] = [];
    }
    this.refs[collection].push(ref);
  }

  remove(collection: Collection, ref: ManagerRef) {
    const index = this.getIndex(collection, ref);
    if (index !== -1 && Array.isArray(this.refs[collection])) {
      this.refs[collection].splice(index, 1);
    }
  }

  setActive = (payload: ManagerRef | null) => (this.active = payload);
  getActive = (): ManagerRef | null => this.active;

  getIndex = (collection: Collection, ref: ManagerRef) => this.refs[collection].indexOf(ref);
  getNodeManagerRef = (node: React.Node): any =>
    _.flatten(Object.values(this.refs)).find((managerRef: any) => managerRef.node === node);

  getOrderedRefs = (collection?: Collection | null) => {
    if (collection === undefined) {
      collection = this.active ? this.active.info.collection : null;
    }
    if (collection !== null) {
      const sortedRefs = [...this.refs[collection]];
      sortedRefs.sort((nodeInfo1, nodeInfo2) => nodeInfo1.info.index - nodeInfo2.info.index);
      return sortedRefs;
    }
    return [];
  };
}

export default Manager;
