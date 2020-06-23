# Use in create-react-app

[create-react-app][create-react-app] can help build a `react` project quickly, and this wizard will explain how to use `rsuite` in conjunction with `create-react-app`.

## Install and Initialization

Before all start, you may need install [yarn][yarn].

```bash
$ yarn create-react-app test-app
```

After execution, the tool will automatically generate a `react` development scaffold and install all dependencies necessary to develop `react`.
Execute after Setup completes

```bash
$ yarn start
```

Open the browser at `http://localhost:3000/`. It renders a header saying "Welcome to React" on the page.

## Install rsuite

```
$ yarn add rsuite
```

And then edit `./src/App.js`

```diff
  import React, { Component } from 'react';
- import logo from './logo.svg';
  import './App.css';

+ import 'rsuite/dist/styles/rsuite-default.css';
+ import { Button } from 'rsuite';

  class App extends Component {
    render() {
      return (
        <div className="App">
-         <header className="App-header">
-           <img src={logo} className="App-logo" alt="logo" />
-           <h1 className="App-title">Welcome to React</h1>
-         </header>
-         <p className="App-intro">
-           To get started, edit <code>src/App.js</code> and save to reload.
-         </p>
+         <Button appearance="primary"> Hello world </Button>
        </div>
      );
    }
  }

  export default App;
```

Then you'll see an accent button and now you can go ahead and develop.

If you encounter other problems, you can check create-react-app's [official documentation][create-react-app-readme].

## Customize Theme

To use the custom theme feature, you must modify the default configuration of the create-react-app.

1.  Installation dependencies.

```bash
yarn add react-app-rewired customize-cra less less-loader
```

2.  Modify scripts in `package.json`

```diff
    "scripts": {
-     "start": "react-scripts start",
+     "start": "react-app-rewired start",
-     "build": "react-scripts build",
+     "build": "react-app-rewired build",
-     "test": "react-scripts test --env=jsdom",
+     "test": "react-app-rewired test --env=jsdom",
-     "eject": "react-scripts eject"
+     "eject": "react-app-rewired eject"
    }
```

3.  Edit `./src/App.js`

```diff
- import 'rsuite/dist/styles/rsuite-default.css';
+ import 'rsuite/lib/styles/index.less';
  import { Button } from 'rsuite';
```

4.  Create a new `config-overrides.js` in the root directory. The contents are as follows:

```javascript
/* config-overrides.js */
const { override, addLessLoader } = require('customize-cra');

module.exports = override(
  addLessLoader({
    // If you are using less-loader@5 or older version, please spread the lessOptions to options directly.
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: { '@base-color': '#f44336' }
    }
  })
);
```

Re-executing `yarn start`, the red button is the configuration was successful

We uses [react-app-rewired][react-app-rewired] and [customize-cra][customize-cra] to implement custom themes with [less-loader][less-loader] using `modifyVars` configuration. For more details, see [Customize Theme](/guide/themes).

## Source code

- [create-react-app](https://github.com/rsuite/rsuite/tree/master/examples/create-react-app)

[yarn]: https://yarnpkg.com/
[nvm]: https://github.com/creationix/nvm#installation
[nvm-windows]: https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows
[create-react-app]: https://github.com/facebook/create-react-app
[create-react-app-readme]: https://github.com/facebook/create-react-app/blob/next/README.md
[react-app-rewired]: https://github.com/timarney/react-app-rewired
[customize-cra]: https://github.com/arackaf/customize-cra
[less-loader]: https://github.com/webpack-contrib/less-loader
