<!--start-code-->

```js
import { Progress } from 'rsuite';

const style = {
  width: 120,
  display: 'inline-block',
  marginRight: 10
};

const App = () => (
  <>
    <div style={style}>
      <Progress.Circle />
    </div>
    <div style={style}>
      <Progress.Circle percent={30} strokeColor="#ffc107" />
    </div>
    <div style={style}>
      <Progress.Circle percent={100} status="success" />
    </div>
    <div style={style}>
      <Progress.Circle percent={30} status="fail" />
    </div>
    <div style={style}>
      <Progress.Circle percent={30} showInfo={false} />
    </div>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
