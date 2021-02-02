<!--start-code-->

```js
/**
 * import { Rate } from 'rsuite'
 * import FrownIcon from '@rsuite/icons/legacy/FrownO';
 * import MehIcon from '@rsuite/icons/legacy/MehO';
 * import SmileIcon from '@rsuite/icons/legacy/SmileO';
 */
const renderCharacter = (value, index) => {
  // unselected character
  if (value < index + 1) {
    return <MehIcon />;
  }
  if (value < 3) {
    return <FrownIcon style={{ color: '#99A9BF' }} />;
  }
  if (value < 4) {
    return <MehIcon style={{ color: '#F4CA1D' }} />;
  }
  return <SmileIcon style={{ color: '#ff9800' }} />;
};

const instance = (
  <div>
    <div>
      <Rate defaultValue={1} renderCharacter={renderCharacter} />
    </div>
    <div>
      <Rate defaultValue={2} renderCharacter={renderCharacter} />
    </div>
    <div>
      <Rate defaultValue={3} renderCharacter={renderCharacter} />
    </div>
    <div>
      <Rate defaultValue={4} renderCharacter={renderCharacter} />
    </div>
    <div>
      <Rate defaultValue={5} renderCharacter={renderCharacter} />
    </div>

    <hr />

    <Rate max={10} defaultValue={2} />
  </div>
);

ReactDOM.render(instance);
```

<!--end-code-->
