import { faker } from '@faker-js/faker/locale/en';
import { SexType } from '@faker-js/faker';

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

export function mockUsers(length: number) {
  const createRowData = rowIndex => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const gender = faker.person.sex() as SexType;
    const name = faker.person.fullName({ firstName, lastName, sex: gender });
    const avatar = 'https://i.pravatar.cc/150?u=' + firstName;

    const city = faker.location.city();
    const street = faker.location.street();
    const email = faker.internet.email();
    const postcode = faker.location.zipCode();
    const phone = faker.phone.number();
    const amount = faker.finance.amount({ min: 1000, max: 90000 });
    const company = faker.company.name();

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
    const list: any[] = [];
    for (let i = 0; i < length; i++) {
      list.push(createNode());
    }
    return sort ? list.sort((a: any, b: any) => (b.children ? 1 : 0) - (a.children ? 1 : 0)) : list;
  };

  const fetchNodes = () => {
    return new Promise(resolve => {
      setTimeout(() => resolve(getNodes(Math.random() * 10)), 500);
    });
  };

  return [getNodes, fetchNodes];
};

export function mockArrayData() {
  return ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(item => ({
    label: item,
    value: item,
    role: Math.random() > 0.5 ? 'Owner' : 'Guest'
  }));
}
