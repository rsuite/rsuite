import { Router } from 'preact-router';
import 'rsuite/styles/index.less';

import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Profile from '../routes/profile';

const App = () => (
  <div id="app">
    <Header />
    <Router>
      <Home path="/" />
      <Profile path="/profile/" user="me" />
      <Profile path="/profile/:user" />
    </Router>
  </div>
);

export default App;
