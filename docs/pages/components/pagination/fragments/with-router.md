<!--start-code-->

```js
import { Pagination } from 'rsuite';
import Link from 'next/link';

const NavLink = React.forwardRef((props, ref) => {
  return <Link ref={ref} href={`?page=${props['data-event-key']}`} {...props} />;
});

const getActivePage = () => {
  const search = location.search.match(/\?page=(\d+)/);
  const activePage = search ? parseInt(search[1]) : 1;
  return activePage;
};

const App = () => {
  const [page, setPage] = React.useState(getActivePage());

  return (
    <Pagination linkAs={NavLink} total={100} limit={10} activePage={page} onChangePage={setPage} />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
