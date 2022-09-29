<!--start-code-->

```js
import { SelectPicker, Loader } from 'rsuite';

const fetchData = (start, length) => {
  return Array.from({ length }).map((_, index) => {
    return {
      label: `Item ${start + index}`,
      value: `Item ${start + index}`
    };
  });
};

const FixedLoader = () => (
  <Loader
    content="Loading..."
    style={{
      display: 'flex',
      justifyContent: 'center',
      position: 'absolute',
      bottom: '0',
      background: '#fff',
      width: '100%',
      padding: '4px 0'
    }}
  />
);

const App = () => {
  const [data, setData] = React.useState(fetchData(0, 30));
  const [loading, setLoading] = React.useState(false);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setData([...data, ...fetchData(data.length, 30)]);
      setLoading(false);
    }, 1000);
  };

  const onItemsRendered = props => {
    if (props.visibleStopIndex >= data.length - 1) {
      loadMore();
    }
  };

  const renderMenu = menu => {
    return (
      <>
        {menu}
        {loading && <FixedLoader />}
      </>
    );
  };

  return (
    <SelectPicker
      data={data}
      style={{ width: 224 }}
      virtualized
      renderMenu={renderMenu}
      listProps={{
        onItemsRendered
      }}
    />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
