import { ItemDataType } from '../../src/@types/common';

export function mockTreeData(options: {
  limits: number[];
  labels: string | string[] | ((layer: number, value: string) => string);
  getRowData?: (layer: number, value: string) => ItemDataType;
}): ItemDataType[] {
  const { limits, labels, getRowData } = options;
  const depth = limits.length;

  const data = [];
  const mock = (list: ItemDataType[], parentValue?: string, layer = 0) => {
    const length = limits[layer];

    Array.from({ length }).forEach((_, index) => {
      const value = parentValue ? parentValue + '-' + (index + 1) : index + 1 + '';
      const children = [];
      const label = Array.isArray(labels) ? labels[layer] : labels;

      let row: ItemDataType = {
        label: typeof label === 'function' ? label(layer, value) : label + ' ' + value,
        value
      };

      if (getRowData) {
        row = {
          ...row,
          ...getRowData(layer, value)
        };
      }

      list.push(row);

      if (layer < depth - 1) {
        row.children = children;
        mock(children, value, layer + 1);
      }
    });
  };

  mock(data);

  return data;
}

export function mockUsers(length: number) {
  const emails = [
    'yahoo.com',
    'gmail.com',
    'hotmail.com',
    'outlook.com',
    'qq.com',
    'live.com',
    'msn.com',
    'yandex.com',
    '163.com',
    'hypers.com'
  ];

  const hobbies = [
    'Fitness',
    'Games',
    'Animation',
    'Travel',
    'Reading',
    'Food',
    'Sports',
    'Music',
    'Movies',
    'Pets'
  ];

  const _r = (n = 10) => Math.floor(Math.random() * n);
  const _toLC = str => str.toLocaleLowerCase();

  const mockChar = () => String.fromCharCode(65 + _r(25));
  const mockStr = length =>
    Array.from({ length })
      .map((_, i) => (i === 0 ? mockChar() : _toLC(mockChar())))
      .join('');

  const createRowData = rowIndex => {
    const firstName = mockStr(_r(5) + 5);
    const lastName = mockStr(_r(5) + 5);
    const city = mockStr(_r(5) + 5) + ' ' + mockStr(_r(5) + 5);
    const street = mockStr(_r(5) + 5) + ' ' + mockStr(_r(5) + 5);
    const email = _toLC(firstName) + '.' + _toLC(lastName) + '@' + emails[_r()];
    const postcode = Math.floor(Math.random() * 1000000);
    const gender = Math.random() >= 0.5 ? 'Male' : 'Female';
    const age = Math.floor(Math.random() * 30) + 18;
    const hobby = hobbies[Math.floor(Math.random() * hobbies.length)];
    const stars = Math.floor(Math.random() * 10000);
    const followers = Math.floor(Math.random() * 10000);

    return {
      id: rowIndex + 1,
      firstName,
      lastName,
      city,
      street,
      postcode,
      email,
      hobby,
      gender,
      age,
      stars,
      followers
    };
  };

  return Array.from({ length }).map((_, index) => {
    return createRowData(index);
  });
}

export const mockTreeDataToString = `export function mockTreeData(options){
  const { limits, labels, getRowData } = options;
  const depth = limits.length;

  const data = [];
  const mock = (list, parentValue, layer = 0) => {
    const length = limits[layer];
    Array.from({ length }).forEach((_, index) => {
      const value = parentValue ? parentValue + '-' + (index + 1) : index + 1 + '';
      const children = [];
      const label = Array.isArray(labels) ? labels[layer] : labels;
      let row = {
        label: typeof label === 'function' ? label(layer, value) : label + ' ' + value,
        value
      };

      if (getRowData) {
        row = {
          ...row,
          ...getRowData(layer, value)
        };
      }

      list.push(row);

      if (layer < depth - 1) {
        row.children = children;
        mock(children, value, layer + 1);
      }
    });
  };

  mock(data);

  return data;
}`;

export const mockUsersString = `export function mockUsers(length: number) {
  const emails = [
    'yahoo.com',
    'gmail.com',
    'hotmail.com',
    'outlook.com',
    'qq.com',
    'live.com',
    'msn.com',
    'yandex.com',
    '163.com',
    'hypers.com'
  ];

  const hobbies = [
    'Fitness',
    'Games',
    'Animation',
    'Travel',
    'Reading',
    'Food',
    'Sports',
    'Music',
    'Movies',
    'Pets'
  ];

  const _r = (n = 10) => Math.floor(Math.random() * n);
  const _toLC = str => str.toLocaleLowerCase();

  const mockChar = () => String.fromCharCode(65 + _r(25));
  const mockStr = length =>
    Array.from({ length })
      .map((_, i) => (i === 0 ? mockChar() : _toLC(mockChar())))
      .join('');

  const createRowData = rowIndex => {
    const firstName = mockStr(_r(5) + 5);
    const lastName = mockStr(_r(5) + 5);
    const city = mockStr(_r(5) + 5) + ' ' + mockStr(_r(5) + 5);
    const street = mockStr(_r(5) + 5) + ' ' + mockStr(_r(5) + 5);
    const email = _toLC(firstName) + '.' + _toLC(lastName) + '@' + emails[_r()];
    const postcode = Math.floor(Math.random() * 1000000);
    const gender = Math.random() >= 0.5 ? 'Male' : 'Female';
    const age = Math.floor(Math.random() * 30) + 18;
    const hobby = hobbies[Math.floor(Math.random() * hobbies.length)];
    const stars = Math.floor(Math.random() * 10000);
    const followers = Math.floor(Math.random() * 10000);

    return {
      id: rowIndex + 1,
      firstName,
      lastName,
      city,
      street,
      postcode,
      email,
      hobby,
      gender,
      age,
      stars,
      followers
    };
  };

  return Array.from({ length }).map((_, index) => {
    return createRowData(index);
  });
}
`;
