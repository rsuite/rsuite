import { Router } from 'preact-router';
import { CustomProvider } from 'rsuite';

import React from 'react';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Profile from '../routes/profile';

const App = () => (
  <CustomProvider theme='dark'>
    <div id="app">
      <Router>
        <Home path="/" />
        <Profile path="/profile/" user="me" />
        <Profile path="/profile/:user" />
      </Router>
    </div>
  </CustomProvider>
);

export default App;
