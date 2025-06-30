<!--start-code-->

```js
import { Loader } from 'rsuite';

const App = () => (
  <>
    <div className="loader-container">
      <Loader inverse center content="loading..." />
    </div>
    <style>
      {`
    .loader-container {
      height: 200px;
      background-color: #000;
    }
    .rs-theme-dark,.rs-theme-high-contrast {
      .loader-container {
        background-color: #fff;
      }
    }
    `}
    </style>
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
