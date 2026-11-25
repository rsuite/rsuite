<!--start-code-->

```js
import { Table } from 'rsuite';
import { faker } from '@faker-js/faker';
import { mockTreeData } from './mock';

const { Column, HeaderCell, Cell } = Table;
const data = mockTreeData({
  limits: [2, 3, 3],
  labels: layer => {
    if (layer === 0) {
      return faker.vehicle.manufacturer();
    } else if (layer === 1) {
      return faker.vehicle.fuel();
    }
    return faker.vehicle.vehicle();
  },
  getRowData: () => ({
    id: faker.string.numeric(5),
    price: faker.commerce.price({
      min: 10000,
      max: 1000000,
      dec: 0,
      symbol: '$'
    }),
    rating: faker.finance.amount({ min: 2, max: 5 })
  })
});

const App = () => {
  return (
    <Table
      isTree
      defaultExpandAllRows
      bordered
      cellBordered
      rowKey="id"
      height={400}
      data={data}
      /** shouldUpdateScroll: whether to update the scroll bar after data update **/
      shouldUpdateScroll={false}
      onExpandChange={(isOpen, rowData) => {
        console.log(isOpen, rowData);
      }}
    >
      <Column width={100}>
        <HeaderCell>Code</HeaderCell>
        <Cell dataKey="id" />
      </Column>
      <Column flexGrow={1} treeCol>
        <HeaderCell>Vehicle 🚗</HeaderCell>
        <Cell dataKey="label" />
      </Column>
      <Column width={180}>
        <HeaderCell>Rating ⭐️</HeaderCell>
        <Cell>
          {rowData =>
            Array.from({ length: rowData.rating }).map((_, i) => <span key={i}>⭐️</span>)
          }
        </Cell>
      </Column>
      <Column width={100}>
        <HeaderCell>Price 💰</HeaderCell>
        <Cell dataKey="price" />
      </Column>
    </Table>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
