### Customized rates

When there are multiple levels of rating, you can customize the character displayed at each level, but you need to implement this yourself

<!--start-code-->

```js
const renderCharacter = (value, index) => {
  // unselected character
  if (value < index + 1) {
    return <Icon icon="meh-o" />;
  }
  if (value < 3) {
    return <Icon icon="frown-o" style={{ color: '#99A9BF' }} />;
  }
  if (value < 4) {
    return <Icon icon="meh-o" style={{ color: '#F4CA1D' }} />;
  }
  return <Icon icon="smile-o" style={{ color: '#ff9800' }} />;
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
