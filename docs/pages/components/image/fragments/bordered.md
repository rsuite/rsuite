<!--start-code-->

```js
import { Image } from 'rsuite';

const App = () => {
  return (
    <Image
      bordered
      src="https://images.unsplash.com/photo-1497994139250-caecb78f9df9?w=500"
      alt="medium-coated black dog"
      width={160}
    />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
