<!--start-code-->

```js
import { Carousel } from 'rsuite';

const App = () => (
  <Carousel autoplay w={600} h={250}>
    <img src="https://placehold.co/600x250/8f8e94/FFFFFF?text=1" height="250" />
    <img src="https://placehold.co/600x250/8f8e94/FFFFFF?text=2" height="250" />
    <img src="https://placehold.co/600x250/8f8e94/FFFFFF?text=3" height="250" />
    <img src="https://placehold.co/600x250/8f8e94/FFFFFF?text=4" height="250" />
    <img src="https://placehold.co/600x250/8f8e94/FFFFFF?text=5" height="250" />
  </Carousel>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
