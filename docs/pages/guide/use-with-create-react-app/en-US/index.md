# Create React App

Create React App is the official way to create single-page React applications. Here's how to use rsuite in Create React App.

## Automatic Installation

Create React App allows users to create projects using templates, and rsuite provides two templates, JavaScript and TypeScript.

### JavaScript Template

To generate a JavaScript project template, run the following command:

<!--{include:<install-cra-js>}-->

### TypeScript Template

To generate a TypeScript project template, run the following command:

<!--{include:<install-cra-ts>}-->

## Manual Installation

If you already have a Create React App project, you can install rsuite by following these steps.

### 1、Install rsuite

In the Create React App project directory, install rsuite by running either of the following commands:

<!--{include:<install-guide>}-->

### 2、Use rsuite components

Edit `./src/App.js` and wrap the root component with the `CustomProvider` component, setting the default theme to `light`:

```tsx
import React from 'react';
import { Button, CustomProvider, Container } from 'rsuite';
import logo from './logo.svg';
import 'rsuite/dist/rsuite.min.css';
import './App.css';

function App() {
  return (
    <CustomProvider theme="light">
      <Container className="app">
        <header className="app-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>

          <Button href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </Button>
        </header>
      </Container>
    </CustomProvider>
  );
}

export default App;
```

## Less-based customization (optional)

By default, you can customize the theme by modifying [CSS variables](https://rsuitejs.com/guide/css-variables/). If you are using Less in your project, you can customize the theme by following these steps.

### 1. Install craco

<!--{include:<install-craco>}-->

### 2. craco.config.js

Create a CRACO configuration file in your project's root directory and configure:

```diff
  my-app
  ├── node_modules
+ ├── craco.config.js
  └── package.json
```

Edit the `craco.config.js` file as follows

```js
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#f44336' },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
};
```

### 3、Import rsuite less file

Edit `./src/App.js` and import the rsuite less file:

```diff
- import 'rsuite/dist/rsuite.min.css';
+ import 'rsuite/styles/index.less';
```

### 4、Use craco CLI

Update the existing calls to react-scripts in the scripts section of your package.json to use the craco CLI:

```diff

"scripts": {
-  "start": "react-scripts start"
+  "start": "craco start"
-  "build": "react-scripts build"
+  "build": "craco build"
-  "test": "react-scripts test"
+  "test": "craco test"
}
```

Restart the project and you will see the customized theme.

## Example projects

- [examples/create-react-app](https://github.com/rsuite/rsuite/tree/main/examples/create-react-app)
