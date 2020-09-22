### Used with `Link` in `react-router`

<!--start-code-->

```js
const NewLink = ({ href, children, ...rest }) => (
	<Link to={href} {...rest}>
		{children}
	</Link>
);

const NavLink = (props) => <Nav.Item componentClass={NewLink} {...props} />;

const instance = (
  <Nav>
    <NavLink href="/">Home</NavLink>
    <NavLink href="/guide/introduction">Guide</NavLink>
    <NavLink href="/components/overview">Components</NavLink>
    <NavLink href="/tools/palette">Tools</NavLink>
  </Nav>
);
ReactDOM.render(instance);
```

<!--end-code-->
