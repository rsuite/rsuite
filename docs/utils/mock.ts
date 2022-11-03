import { faker } from '@faker-js/faker/locale/en';

export const importFakerString = `import { faker } from '@faker-js/faker/locale/en';`;

export function mockTreeData(options: {
  limits: number[];
  labels: string | string[] | ((layer: number, value: string, faker) => string);
  getRowData?: (layer: number, value: string) => any[];
}) {
  const { limits, labels, getRowData } = options;
  const depth = limits.length;

  const data = [];
  const mock = (list, parentValue?: string, layer = 0) => {
    const length = limits[layer];

    Array.from({ length }).forEach((_, index) => {
      const value = parentValue ? parentValue + '-' + (index + 1) : index + 1 + '';
      const children = [];
      const label = Array.isArray(labels) ? labels[layer] : labels;

      let row: any = {
        label: typeof label === 'function' ? label(layer, value, faker) : label + ' ' + value,
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
        label: typeof label === 'function' ? label(layer, value, faker) : label + ' ' + value,
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

export function mockUsers(length: number) {
  const createRowData = rowIndex => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const gender = faker.name.gender(true) as 'female' | 'male';
    const name = faker.name.findName(firstName, lastName, gender);
    const avatar = faker.image.avatar();

    const city = faker.address.city();
    const street = faker.address.street();
    const email = faker.internet.email();
    const postcode = faker.address.zipCode();
    const phone = faker.phone.number();
    const amount = faker.finance.amount(1000, 90000);
    const company = faker.company.companyName();

    const age = Math.floor(Math.random() * 30) + 18;
    const stars = Math.floor(Math.random() * 10000);
    const followers = Math.floor(Math.random() * 10000);
    const rating = 2 + Math.floor(Math.random() * 3);
    const progress = Math.floor(Math.random() * 100);

    return {
      id: rowIndex + 1,
      name,
      firstName,
      lastName,
      avatar,
      city,
      street,
      postcode,
      email,
      phone,
      gender,
      age,
      stars,
      followers,
      rating,
      progress,
      amount,
      company
    };
  };

  return Array.from({ length }).map((_, index) => {
    return createRowData(index);
  });
}

export const mockUsersString = `export function mockUsers(length) {
  const createRowData = rowIndex => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const gender = faker.name.gender(true);
    const name = faker.name.findName(firstName, lastName, gender);
    const avatar = faker.image.avatar();

    const city = faker.address.city();
    const street = faker.address.street();
    const email = faker.internet.email();
    const postcode = faker.address.zipCode();
    const phone = faker.phone.number();
    const amount = faker.finance.amount(1000, 90000);

    const age = Math.floor(Math.random() * 30) + 18;
    const stars = Math.floor(Math.random() * 10000);
    const followers = Math.floor(Math.random() * 10000);
    const rating = 2 + Math.floor(Math.random() * 3);
    const progress = Math.floor(Math.random() * 100);

    return {
      id: rowIndex + 1,
      name,
      firstName,
      lastName,
      avatar,
      city,
      street,
      postcode,
      email,
      phone,
      gender,
      age,
      stars,
      followers,
      rating,
      progress,
      amount
    };
  };

  return Array.from({ length }).map((_, index) => {
    return createRowData(index);
  });
}
`;

export const mockAsyncData = (sort = true) => {
  const createNode = () => {
    const hasChildren = Math.random() > 0.5;
    const label = (hasChildren ? 'Folder' : 'File') + ' ' + faker.word.noun(5);

    return {
      label,
      value: Math.random() * 1e18,
      children: hasChildren ? [] : null
    };
  };

  const getNodes = length => {
    const list = [];
    for (let i = 0; i < length; i++) {
      list.push(createNode());
    }

    return sort ? list.sort((a, b) => (b.children ? 1 : 0) - (a.children ? 1 : 0)) : list;
  };

  const fetchNodes = () => {
    return new Promise(resolve => {
      setTimeout(() => resolve(getNodes(Math.random() * 10)), 500);
    });
  };

  return [getNodes, fetchNodes];
};

export const mockAsyncDataString = `export const mockAsyncData = (sort = true) => {
  const createNode = () => {
    const hasChildren = Math.random() > 0.5;
    const label = (hasChildren ? 'Folder' : 'File') + ' ' + faker.word.noun(5);

    return {
      label,
      value: Math.random() * 1e18,
      children: hasChildren ? [] : null
    };
  };

  const getNodes = length => {
    const list = [];
    for (let i = 0; i < length; i++) {
      list.push(createNode());
    }
    return sort ? list.sort((a, b) => (b.children ? 1 : 0) - (a.children ? 1 : 0)) : list;
  };

  const fetchNodes = length => {
    return new Promise(resolve => {
      setTimeout(
        () => resolve(getNodes(typeof length === 'number' ? length : Math.random() * 10)),
        500
      );
    });
  };

  return [getNodes, fetchNodes];
};
`;
