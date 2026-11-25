<!--start-code-->

```js
import { Table } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;

const FixedLoader = () => (
  <Loader
    content="Loading..."
    style={{
      display: 'flex',
      justifyContent: 'center',
      position: 'absolute',
      bottom: '0',
      background: '#f5f5f5',
      width: '100%',
      padding: '4px 0'
    }}
  />
);

const fetchData = (start, length) => {
  return Array.from({ length }).map((_, index) => {
    return {
      index: start + index,
      texts: faker.lorem.paragraph()
    };
  });
};

const tableHeight = 400;

const App = () => {
  const [data, setData] = React.useState(fetchData(0, 50));
  const [loading, setLoading] = React.useState(false);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setData([...data, ...fetchData(data.length, 50)]);
      setLoading(false);
    }, 1000);
  };

  const handleScroll = (x, y) => {
    const contextHeight = data.length * 46;
    const top = Math.abs(y);

    if (contextHeight - top - tableHeight < 300) {
      loadMore();
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <Table
        virtualized
        shouldUpdateScroll={false}
        height={tableHeight}
        data={data}
        onScroll={handleScroll}
      >
        <Column width={100}>
          <HeaderCell>Index</HeaderCell>
          <Cell dataKey="index" />
        </Column>
        <Column width={200} flexGrow={1}>
          <HeaderCell>Texts</HeaderCell>
          <Cell dataKey="texts" />
        </Column>
      </Table>
      {loading && <FixedLoader />}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
