<!--start-code-->

```js
import { Pagination } from 'rsuite';
import Link from 'next/link';

const NavLink = React.forwardRef((props, ref) => {
  const { href, active, eventKey, as, ...rest } = props;
  return (
    <Link
      ref={ref}
      href={`${location.pathname}?page=${eventKey}`}
      className={active ? 'active' : null}
      as={as}
      {...rest}
    />
  );
});

const App = () => {
  const search = location.search.match(/\?page=(\d+)/);
  const activePage = search ? parseInt(search[1]) : 1;

  return <Pagination linkAs={NavLink} total={100} limit={10} activePage={activePage} />;
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
