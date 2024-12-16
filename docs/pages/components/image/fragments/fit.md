<!--start-code-->

```js
import { Image } from 'rsuite';

const App = () => {
  return (
    <Image
      fit="contain"
      src="https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=265"
      alt="brown french bulldog puppy lying on yellow textile"
      width={200}
      height={160}
      bordered
    />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
