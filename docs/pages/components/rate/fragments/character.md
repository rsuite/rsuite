<!--start-code-->

```js
import { Rate, VStack } from 'rsuite';
import HeartIcon from '@rsuite/icons/legacy/Heart';
import BeerIcon from '@rsuite/icons/legacy/Beer';
import FrownIcon from '@rsuite/icons/legacy/FrownO';

const App = () => (
  <VStack>
    <Rate defaultValue={3} character={<HeartIcon />} />
    <Rate defaultValue={3} character={<BeerIcon />} color="yellow" />
    <Rate defaultValue={3} character="A" />
    <Rate
      defaultValue={2}
      character={({ index }) => {
        return index + 1;
      }}
    />
    <Rate
      defaultValue={2}
      character={<FrownIcon />}
      renderCharacter={(value, index) => {
        return index < value ? <HeartIcon style={{ color: 'red' }} /> : <FrownIcon />;
      }}
    />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
