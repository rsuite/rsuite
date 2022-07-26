<!--start-code-->

```js
import { Uploader, Button } from 'rsuite';

const App = () => {
  const [value, setValue] = React.useState([]);
  const uploader = React.useRef();

  return (
    <>
      <Uploader
        value={value}
        autoUpload={false}
        action="//jsonplaceholder.typicode.com/posts/"
        onChange={setValue}
        ref={uploader}
      />
      <hr />
      <Button
        disabled={!value.length}
        onClick={() => {
          uploader.current.start();
        }}
      >
        Start Upload
      </Button>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
