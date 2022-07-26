<!--start-code-->

```js
import { Table } from 'rsuite';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import { mockTreeData } from './mock';

const { Column, HeaderCell, Cell } = Table;
const data = mockTreeData({
  limits: [2, 3, 3],
  labels: layer => `Layer ${layer + 1}`,
  getRowData: () => ({
    stars: Math.floor(Math.random() * 10000),
    followers: Math.floor(Math.random() * 10000)
  })
});

const App = () => {
  return (
    <Table
      isTree
      defaultExpandAllRows
      bordered
      cellBordered
      rowKey="value"
      height={400}
      data={data}
      /** shouldUpdateScroll: whether to update the scroll bar after data update **/
      shouldUpdateScroll={false}
      onExpandChange={(isOpen, rowData) => {
        console.log(isOpen, rowData);
      }}
      renderTreeToggle={(icon, rowData) => {
        if (rowData.children && rowData.children.length === 0) {
          return <SpinnerIcon spin />;
        }
        return icon;
      }}
    >
      <Column flexGrow={1}>
        <HeaderCell>Label</HeaderCell>
        <Cell dataKey="label" />
      </Column>

      <Column width={100}>
        <HeaderCell>Stars</HeaderCell>
        <Cell dataKey="stars" />
      </Column>

      <Column width={100}>
        <HeaderCell>Followers</HeaderCell>
        <Cell dataKey="followers" />
      </Column>
    </Table>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
