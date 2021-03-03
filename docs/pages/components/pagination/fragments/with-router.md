<!--start-code-->

```js
const NavLink = React.forwardRef((props, ref) => {
  const { href, active, eventKey, as, ...rest } = props;
  return (
    <Link
      href={`${location.pathname}?page=${eventKey}`}
      className={active ? 'active' : null}
      as={as}
    >
      <a ref={ref} {...rest} />
    </Link>
  );
});

const App = () => {
  const search = location.search.match(/\?page=(\d+)/);
  const activePage = search ? parseInt(search[1]) : 1;

  return <Pagination linkAs={NavLink} total={100} limit={10} activePage={activePage} />;
};
ReactDOM.render(<App />);
```

<!--end-code-->
