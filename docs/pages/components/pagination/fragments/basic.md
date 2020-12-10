<!--start-code-->

```js
const App = () => {
  const [activePage, setActivePage] = React.useState(1);
  return <Pagination pages={10} activePage={activePage} onSelect={setActivePage} />;
};

ReactDOM.render(<App />);
```

<!--end-code-->
