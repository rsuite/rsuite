export { mockTreeData, mockUsers, mockAsyncData } from '../../docs/utils/mock';

export function mockArrayData() {
  return ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(item => ({
    label: item,
    value: item,
    role: Math.random() > 0.5 ? 'Owner' : 'Guest'
  }));
}
