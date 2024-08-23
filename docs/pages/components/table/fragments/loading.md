<!--start-code-->

```js
import { Table, Toggle, Placeholder, Loader } from 'rsuite';
import { mockUsers } from './mock';

const { Column, HeaderCell, Cell } = Table;
const data = mockUsers(10);

const columns = [
  {
    key: 'company',
    label: 'Company',
    flexGrow: 2
  },
  {
    key: 'city',
    label: 'City',
    flexGrow: 1
  },
  {
    key: 'street',
    label: 'Street',
    flexGrow: 1
  },
  {
    key: 'postcode',
    label: 'Postcode',
    flexGrow: 1
  }
];

const loaderContainerStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  background: 'var(--rs-bg-card)',
  padding: 20,
  zIndex: 1
};

const App = () => {
  const [loading, setLoading] = React.useState(true);
  const [withPlaceholder, setWithPlaceholder] = React.useState(false);

  const renderLoading = () => {
    if (withPlaceholder) {
      return (
        <div style={loaderContainerStyle}>
          <Placeholder.Grid rows={9} columns={4} active />
        </div>
      );
    }

    return <Loader center backdrop content="Loading..." />;
  };

  return (
    <div>
      <HStack>
        <Toggle checked={loading} onChange={setLoading}>
          Loading
        </Toggle>

        <Toggle checked={withPlaceholder} onChange={setWithPlaceholder}>
          With Placeholder
        </Toggle>
      </HStack>

      <hr />

      <Table loading={loading} height={300} data={data} renderLoading={renderLoading}>
        {columns.map(column => {
          const { key, label, ...rest } = column;
          return (
            <Column {...rest} key={key}>
              <HeaderCell>{label}</HeaderCell>
              <Cell dataKey={key} />
            </Column>
          );
        })}
      </Table>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
