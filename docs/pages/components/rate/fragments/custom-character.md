<!--start-code-->

```js
const renderCharacter = (value, index) => {
  // unselected character
  if (value < index + 1) {
    return <MehO />;
  }
  if (value < 3) {
    return <FrownO style={{ color: '#99A9BF' }} />;
  }
  if (value < 4) {
    return <MehO style={{ color: '#F4CA1D' }} />;
  }
  return <SmileO style={{ color: '#ff9800' }} />;
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
