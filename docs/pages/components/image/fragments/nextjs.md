<!--start-code-->

```js
import NextImage from 'next/image';
import { Image } from 'rsuite';

const App = () => {
  return (
    <Image
      width={300}
      height={200}
      as={NextImage}
      src="https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=300"
      alt="black and white short coated dog"
    />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
