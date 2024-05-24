<!--start-code-->

```js
import { Panel } from 'rsuite';

const App = () => (
  <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: 240 }}>
    <img src="https://via.placeholder.com/240x180" height="180" />
    <Panel header="RSUITE">
      <p>
        <small>
          A suite of React components, sensible UI design, and a friendly development experience.
        </small>
      </p>
    </Panel>
  </Panel>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
