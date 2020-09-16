<!--start-code-->

```js
const App = () => {
  const [activePage, setActivePage] = React.useState(5);
  return (
    <div>
      <Pagination
        prev
        last
        next
        first
        size="lg"
        pages={10}
        activePage={activePage}
        onSelect={setActivePage}
      />
      <Divider />
      <Pagination
        prev
        last
        next
        first
        size="md"
        pages={10}
        activePage={activePage}
        onSelect={setActivePage}
      />
      <Divider />
      <Pagination
        prev
        last
        next
        first
        size="sm"
        pages={10}
        activePage={activePage}
        onSelect={setActivePage}
      />
      <Divider />
      <Pagination
        prev
        last
        next
        first
        size="xs"
        pages={10}
        activePage={activePage}
        onSelect={setActivePage}
      />
    </div>
  );
};
ReactDOM.render(<App />);
```

<!--end-code-->
