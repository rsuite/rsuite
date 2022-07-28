<!--start-code-->

```js
import { Pagination } from 'rsuite';

const App = () => {
  const [activePage, setActivePage] = React.useState(5);

  return (
    <>
      <Pagination
        prev
        last
        next
        first
        size="lg"
        total={100}
        limit={10}
        activePage={activePage}
        onChangePage={setActivePage}
      />
      <Divider />
      <Pagination
        prev
        last
        next
        first
        size="md"
        total={100}
        limit={10}
        activePage={activePage}
        onChangePage={setActivePage}
      />
      <Divider />
      <Pagination
        prev
        last
        next
        first
        size="sm"
        total={100}
        limit={10}
        activePage={activePage}
        onChangePage={setActivePage}
      />
      <Divider />
      <Pagination
        prev
        last
        next
        first
        size="xs"
        total={100}
        limit={10}
        activePage={activePage}
        onChangePage={setActivePage}
      />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
