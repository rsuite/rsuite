<!--start-code-->

```js
import { TagInput } from 'rsuite';

const App = () => (
  <>
    <TagInput
      trigger={'Enter'}
      placeholder="Enter"
      w={300}
      onCreate={(value, item) => {
        console.log(value, item);
      }}
    />
    <hr />
    <TagInput
      trigger={'Space'}
      placeholder="Space"
      w={300}
      onCreate={(value, item) => {
        console.log(value, item);
      }}
    />
    <hr />
    <TagInput
      trigger={'Comma'}
      placeholder="Comma"
      w={300}
      onCreate={(value, item) => {
        console.log(value, item);
      }}
    />
    <hr />
    <TagInput
      trigger={['Enter', 'Space', 'Comma']}
      placeholder="Enter, Space, Comma"
      w={300}
      onCreate={(value, item) => {
        console.log(value, item);
      }}
    />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
