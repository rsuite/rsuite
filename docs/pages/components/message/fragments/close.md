<!--start-code-->

```js
import { Message } from 'rsuite';

const App = () => (
  <>
    <Message closable type="info">
      Informational
    </Message>
    <Message closable type="info" header="Informational">
      Detailed description and advices about successful copywriting.
      <a href="#">This is a Link.</a>
    </Message>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
