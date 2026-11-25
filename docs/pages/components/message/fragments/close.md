<!--start-code-->

```js
import { Message } from 'rsuite';

const App = () => (
  <>
    <Message closable type="info">
      <strong>Info!</strong> You can use the `Message` component to display a info message.
    </Message>
    <Message closable type="info" header={<strong>Info!</strong>}>
      Additional description and informations about copywriting.
    </Message>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
