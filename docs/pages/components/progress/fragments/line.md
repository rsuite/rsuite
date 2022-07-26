<!--start-code-->

```js
import { Progress } from 'rsuite';

const App = () => (
  <>
    <Progress.Line />
    <Progress.Line percent={30} strokeColor="#ffc107" />
    <Progress.Line percent={30} status="active" />
    <Progress.Line percent={50} status="fail" />
    <Progress.Line percent={100} status="success" />
    <Progress.Line percent={80} showInfo={false} />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
