<!--start-code-->

```js
const MyToggle = ({ label, checked, onChange }) => {
  return (
    <span>
      {label}：
      <Toggle checked={checked} onChange={onChange} />
    </span>
  );
};

const limitOptions = [30, 50, 100];

const App = () => {
  const [prev, setPrev] = React.useState(true);
  const [next, setNext] = React.useState(true);
  const [first, setFirst] = React.useState(true);
  const [last, setLast] = React.useState(true);
  const [ellipsis, setEllipsis] = React.useState(true);
  const [boundaryLinks, setBoundaryLinks] = React.useState(true);
  const [activePage, setActivePage] = React.useState(1);
  const [size, setSize] = React.useState('xs');
  const [maxButtons, setMaxButtons] = React.useState(5);
  const [total, setTotal] = React.useState(200);
  const [layout, setLayout] = React.useState(['total', '-', 'limit', '|', 'pager', 'skip']);
  const [limit, setLimit] = React.useState(50);

  return (
    <div>
      <div>
        <MyToggle label="first" checked={first} onChange={setFirst} />
        <MyToggle label="last" checked={last} onChange={setLast} />
        <MyToggle label="prev" checked={prev} onChange={setPrev} />
        <MyToggle label="next" checked={next} onChange={setNext} />

        <MyToggle label="ellipsis" checked={ellipsis} onChange={setEllipsis} />
        <MyToggle label="boundaryLinks" checked={boundaryLinks} onChange={setBoundaryLinks} />
        <hr />
        <span>
          size：
          <SelectPicker
            value={size}
            onChange={setSize}
            cleanable={false}
            searchable={false}
            data={[
              { value: 'xs', label: 'xs' },
              { value: 'sm', label: 'sm' },
              { value: 'md', label: 'md' },
              { value: 'lg', label: 'lg' }
            ]}
          />
        </span>

        <span style={{ marginLeft: 20 }}>
          limit：
          <SelectPicker
            value={limit}
            onChange={setLimit}
            cleanable={false}
            searchable={false}
            data={limitOptions.map(key => ({ value: key, label: key }))}
          />
        </span>

        <span style={{ marginLeft: 20 }}>
          maxButtons：
          <InputNumber
            style={{ width: 80, display: 'inline-flex' }}
            value={maxButtons}
            max={10}
            min={1}
            onChange={value => {
              setMaxButtons(parseInt(value));
            }}
          />
        </span>

        <span style={{ marginLeft: 20 }}>
          total：
          <InputNumber
            style={{ width: 80, display: 'inline-flex' }}
            value={total}
            min={0}
            onChange={value => {
              setTotal(parseInt(value));
            }}
          />
        </span>

        <hr />
        <span>
          layout：
          <TagPicker
            value={layout}
            onChange={setLayout}
            cleanable={false}
            searchable={false}
            data={[
              { value: 'total', label: 'total' },
              { value: '-', label: '-' },
              { value: 'pager', label: 'pager' },
              { value: '|', label: '|' },
              { value: 'limit', label: 'limit' },
              { value: 'skip', label: 'skip' }
            ]}
          />
        </span>
      </div>

      <hr />
      <Pagination
        layout={layout}
        size={size}
        prev={prev}
        next={next}
        first={first}
        last={last}
        ellipsis={ellipsis}
        boundaryLinks={boundaryLinks}
        total={total}
        limit={limit}
        limitOptions={limitOptions}
        maxButtons={maxButtons}
        activePage={activePage}
        onChangePage={setActivePage}
        onChangeLimit={setLimit}
      />
    </div>
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->
