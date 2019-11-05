import _ from 'lodash';

export const guid = (num = 8) => (Math.random() * 1e18).toString(36).slice(0, num);
export const getFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (_.get(event, 'dataTransfer') && typeof _.get(event, 'dataTransfer') === 'object') {
    return _.get(event, 'dataTransfer.files');
  }
  if (event.target) {
    return _.get(event, 'target.files');
  }
  return [];
};
