<!--start-code-->

```js
import { Pagination } from 'rsuite';

const App = () => {
  const [activePage, setActivePage] = React.useState(1);

  return (
    <>
      <Pagination total={100} limit={10} activePage={activePage} onChangePage={setActivePage} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
