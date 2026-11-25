<!--start-code-->

```js
import { Uploader, Button } from 'rsuite';

const App = () => (
  <>
    <Uploader action="//jsonplaceholder.typicode.com/posts/">
      <Button>Select files...</Button>
    </Uploader>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
