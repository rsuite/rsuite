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

const App = () => {
  const [prev, setPrev] = React.useState(true);
  const [next, setNext] = React.useState(true);
  const [first, setFirst] = React.useState(true);
  const [last, setLast] = React.useState(true);
  const [ellipsis, setEllipsis] = React.useState(true);
  const [boundaryLinks, setBoundaryLinks] = React.useState(true);
  const [activePage, setActivePage] = React.useState(1);

  const renderToggle = (prop, setProp) => {
    return (
      <span>
        {prop}：
        <Toggle checked={prop} onChange={setProp} />
      </span>
    );
  };

  return (
    <div>
      <div>
        <MyToggle label="first" checked={first} onChange={setFirst} />
        <MyToggle label="last" checked={last} onChange={setLast} />
        <MyToggle label="prev" checked={prev} onChange={setPrev} />
        <MyToggle label="next" checked={next} onChange={setNext} />
        <br />
        <br />
        <MyToggle label="ellipsis" checked={ellipsis} onChange={setEllipsis} />
        <MyToggle label="boundaryLinks" checked={boundaryLinks} onChange={setBoundaryLinks} />
      </div>

      <hr />
      <Pagination
        prev={prev}
        next={next}
        first={first}
        last={last}
        ellipsis={ellipsis}
        boundaryLinks={boundaryLinks}
        pages={30}
        maxButtons={5}
        activePage={activePage}
        onSelect={setActivePage}
      />
    </div>
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->
