<!--start-code-->

```js
import { Uploader } from 'rsuite';

const App = () => {
  const [value, setValue] = React.useState([]);
  return (
    <>
      <Uploader
        fileList={value}
        action="//jsonplaceholder.typicode.com/posts/"
        onChange={setValue}
      />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
