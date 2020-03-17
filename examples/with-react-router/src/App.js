import React from 'react';
import { Nav } from 'rsuite';
import { HashRouter as Router, Switch, Route, Link, useLocation } from 'react-router-dom';

// eslint-disable-next-line react/display-name
const NavLink = React.forwardRef((props, ref) => {
  const location = useLocation();
  return (
    <Nav.Item {...props} ref={ref} active={props.to === location.pathname} componentClass={Link} />
  );
});

export default function App() {
  return (
    <Router>
      <div>
        <Nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/users">Users</NavLink>
        </Nav>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
