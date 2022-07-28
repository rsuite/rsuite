<!--start-code-->

```js
import { Progress } from 'rsuite';

const App = () => (
  <div className="line-vertical-wrapper" style={{ height: 500 }}>
    <Progress.Line vertical />
    <Progress.Line vertical percent={30} strokeColor="#ffc107" />
    <Progress.Line vertical percent={30} status="active" />
    <Progress.Line vertical percent={50} status="fail" />
    <Progress.Line vertical percent={100} status="success" />
    <Progress.Line vertical percent={80} showInfo={false} />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
