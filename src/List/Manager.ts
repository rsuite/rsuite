import _ from 'lodash';

interface ManagerActive {
  collection: number | string;
  index: number;
}

/*
* Move manager
* */
class Manager {
  refs = {};
  active: ManagerActive | null;

  add(collection, ref) {
    if (!this.refs[collection]) {
      this.refs[collection] = [];
    }

    this.refs[collection].push(ref);
  }

  remove(collection, ref) {
    const index = this.getIndex(collection, ref);

    if (index !== -1) {
      if (Array.isArray(this.refs[collection])) {
        this.refs[collection].splice(index, 1);
      }
    }
  }

  getActive = () => {
    const ActiveIndex = _.get(this.active, 'index', null);
    const ActiveCollection = _.get(this.active, 'collection', null);
    return (
      ActiveIndex !== null &&
      ActiveCollection !== null &&
      this.refs[ActiveCollection].find(({ node }) => node.sortableInfo.index === ActiveIndex)
    );
  };
  getIndex = (collection, ref) => this.refs[collection].indexOf(ref);

  getOrderedRefs(collection?: any) {
    if (this.active !== null) {
      if (collection === undefined) {
        collection = this.active.collection;
      }
      return this.refs[collection].sort(
        (nodeInfo1, nodeInfo2) =>
          nodeInfo1.node.sortableInfo.index - nodeInfo2.node.sortableInfo.index
      );
    }
    return [];
  }
}

export default Manager;
